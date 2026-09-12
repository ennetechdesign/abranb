import Link from "next/link";

import type { resources } from "@/i18n/resources";

type Documentos = (typeof resources)["pt-BR"]["documentos"];
export type DocItem = Documentos["sections"]["pareceres"]["docs"][number];

function FileLinesIcon() {
  return (
    <svg
      className="docs-pill-icon"
      viewBox="0 0 384 512"
      fill="currentColor"
      aria-hidden
    >
      <path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM112 256l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
    </svg>
  );
}

export function DocPill({ doc }: { doc: DocItem }) {
  const href = doc.href && doc.href !== "#" ? doc.href : "#";
  const isExternal = /^https?:\/\//.test(href);

  return (
    <Link
      href={href}
      className="docs-pill"
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <FileLinesIcon />
      <span className="docs-pill-label">{doc.label}</span>
    </Link>
  );
}
