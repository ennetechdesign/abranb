"use client";

import type { Publication } from "@/sanity/publication";
import { PublicationCard } from "@/components/blog/publication-card";
import { Pagination } from "@/components/blog/pagination";

type PublicationListProps = {
  posts: Publication[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  baseHref: string;
  emptyMessage: string;
  "aria-label"?: string;
};

export function PublicationList({
  posts,
  currentPage,
  totalPages,
  totalCount,
  baseHref,
  emptyMessage,
  "aria-label": ariaLabel = "Lista de publicações",
}: PublicationListProps) {
  return (
    <section aria-label={ariaLabel}>
      {posts.length === 0 ? (
        <p className="text-lead text-muted-foreground text-center py-12">
          {emptyMessage}
        </p>
      ) : (
        <>
          <ul className="mx-auto flex max-w-4xl flex-col gap-7 sm:gap-12">
            {posts.map((post) => (
              <li key={post._id}>
                <PublicationCard post={post} />
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseHref={baseHref}
            aria-label="Paginação de publicações"
          />
          <p className="mt-4 text-caption text-muted-foreground text-center">
            {totalCount} publicação{totalCount !== 1 ? "s" : ""} encontrada{
              totalCount !== 1 ? "s" : ""
            }
          </p>
        </>
      )}
    </section>
  );
}

