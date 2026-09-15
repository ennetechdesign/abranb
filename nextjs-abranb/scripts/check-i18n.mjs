#!/usr/bin/env node
// Verifies that each locale JSON namespace has the same key shape across
// locales, and flags arrays whose items repeat the same non-trivial string
// value across most/all entries (the class of bug fixed in cb8c09e, where
// en/pautas.json had the exact same placeholder paragraph in every topic).
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const localesDir = fileURLToPath(
  new URL("../src/i18n/locales", import.meta.url),
);
const locales = readdirSync(localesDir).filter((entry) => !entry.startsWith("."));

function flattenKeys(value, prefix = "") {
  const out = new Set();
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      for (const k of flattenKeys(item, `${prefix}[${index}]`)) out.add(k);
    });
    return out;
  }
  if (value !== null && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      for (const k of flattenKeys(child, prefix ? `${prefix}.${key}` : key)) {
        out.add(k);
      }
    }
    return out;
  }
  out.add(prefix);
  return out;
}

// Finds every array in the tree, and for arrays of >=3 items, checks
// whether any leaf sub-path repeats the same non-trivial string across a
// majority of items (e.g. topics[*].items[*] all holding the same text).
function findSuspiciousArrayRepeats(value, pathPrefix, results) {
  if (Array.isArray(value)) {
    if (value.length >= 3) {
      const bySubpath = new Map();
      value.forEach((item, index) => {
        const leaves = flattenLeavesWithSubpath(item);
        for (const [subpath, val] of leaves) {
          if (typeof val !== "string" || val.trim().length < 10) continue;
          if (!bySubpath.has(subpath)) bySubpath.set(subpath, new Map());
          const valMap = bySubpath.get(subpath);
          valMap.set(val, [...(valMap.get(val) ?? []), index]);
        }
      });
      for (const [subpath, valMap] of bySubpath) {
        for (const [val, indices] of valMap) {
          if (indices.length >= 3 && indices.length > value.length / 2) {
            results.push({
              path: `${pathPrefix}[*]${subpath}`,
              value: val,
              count: indices.length,
              total: value.length,
            });
          }
        }
      }
    }
    value.forEach((item, index) =>
      findSuspiciousArrayRepeats(item, `${pathPrefix}[${index}]`, results),
    );
    return;
  }
  if (value !== null && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      findSuspiciousArrayRepeats(child, pathPrefix ? `${pathPrefix}.${key}` : key, results);
    }
  }
}

function flattenLeavesWithSubpath(value, prefix = "") {
  const out = [];
  if (Array.isArray(value)) {
    value.forEach((item, index) => out.push(...flattenLeavesWithSubpath(item, `${prefix}[${index}]`)));
    return out;
  }
  if (value !== null && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      out.push(...flattenLeavesWithSubpath(child, prefix ? `${prefix}.${key}` : key));
    }
    return out;
  }
  out.push([prefix, value]);
  return out;
}

let hasError = false;
const namespaces = readdirSync(path.join(localesDir, locales[0])).map((f) =>
  f.replace(/\.json$/, ""),
);

for (const namespace of namespaces) {
  const jsonByLocale = {};
  for (const locale of locales) {
    const filePath = path.join(localesDir, locale, `${namespace}.json`);
    jsonByLocale[locale] = JSON.parse(readFileSync(filePath, "utf8"));
  }

  const keySetsByLocale = locales.map((locale) => flattenKeys(jsonByLocale[locale]));
  const allKeys = new Set(keySetsByLocale.flatMap((s) => [...s]));
  for (const key of allKeys) {
    const missing = locales.filter((_, i) => !keySetsByLocale[i].has(key));
    if (missing.length > 0) {
      hasError = true;
      console.error(`[${namespace}] key "${key}" missing in: ${missing.join(", ")}`);
    }
  }

  for (const locale of locales) {
    const results = [];
    findSuspiciousArrayRepeats(jsonByLocale[locale], "", results);
    for (const r of results) {
      hasError = true;
      console.error(
        `[${namespace}/${locale}] "${r.path}" repeats the same text in ${r.count}/${r.total} items: "${r.value}"`,
      );
    }
  }
}

if (hasError) {
  console.error("\ni18n parity check failed.");
  process.exit(1);
} else {
  console.log(
    `i18n parity check passed (${namespaces.length} namespaces, ${locales.length} locales).`,
  );
}
