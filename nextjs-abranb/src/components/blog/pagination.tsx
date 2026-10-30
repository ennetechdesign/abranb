"use client";

import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  baseHref: string;
  "aria-label"?: string;
};

export function Pagination({ currentPage, totalPages, baseHref, "aria-label": ariaLabel = "Paginação" }: PaginationProps) {
  if (totalPages <= 1) return null;
  const separator = baseHref.includes("?") ? "&" : "?";
  const pageHref = (page: number) => `${baseHref}${separator}page=${page}`;
  const pages = [...new Set([1, 2, 3, totalPages].filter((page) => page <= totalPages))];
  return <nav aria-label={ariaLabel} className="mt-10 flex items-center justify-center gap-3 sm:mt-14">
    {pages.map((page, index) => <span key={page} className="contents">
      {index > 0 && page - pages[index - 1] > 1 && <span className="px-1 text-muted-foreground" aria-hidden="true">…</span>}
      <Link href={pageHref(page)} aria-current={currentPage === page ? "page" : undefined} aria-label={`Página ${page}`} className={`flex h-10 min-w-10 items-center justify-center rounded-full px-3 font-semibold shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-focus-ring ${currentPage === page ? "bg-purple text-white [html[data-color-scheme='night']_&]:bg-gold [html[data-color-scheme='night']_&]:text-black [html[data-color-scheme='high-contrast']_&]:bg-gold [html[data-color-scheme='high-contrast']_&]:text-black" : "bg-lilac text-foreground hover:bg-purple/30 [html[data-color-scheme='night']_&]:bg-gold/50 [html[data-color-scheme='night']_&]:text-white [html[data-color-scheme='night']_&]:hover:bg-gold/70 [html[data-color-scheme='high-contrast']_&]:bg-gold/50 [html[data-color-scheme='high-contrast']_&]:text-white [html[data-color-scheme='high-contrast']_&]:hover:bg-gold/70"}`}>{page}</Link>
    </span>)}
  </nav>;
}
