import type { Metadata } from "next";

import { getServerLocale } from "@/lib/resolve-locale";
import { resources } from "@/i18n/resources";
import { buildLocaleMetadata } from "@/lib/page-metadata";

import { HistoriaSections } from "./historia-sections";

import "./historia.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return buildLocaleMetadata(locale, "historia");
}

export default async function HistoryPage() {
  const locale = await getServerLocale();
  const copy = resources[locale].historia;

  return <HistoriaSections copy={copy} />;
}
