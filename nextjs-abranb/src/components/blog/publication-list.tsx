"use client";

import type { Publication } from "@/sanity/publication";
import BoxNoticesSlide from "@/app/home-sections/components/box-notices-slide";
import { getImageUrl } from "@/sanity/image";
import { Pagination } from "@/components/blog/pagination";

const COVER_FALLBACK = "/images/imagem-indisponivel.png";
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
            {posts.map((post, index) => {
              const coverUrl = getImageUrl(post.coverImage, 900, 600);
              return (
                <li key={post._id} className="flex w-full justify-center">
                  <BoxNoticesSlide notice={{
                    id: index + 1,
                    foto: coverUrl ?? COVER_FALLBACK,
                    titulo: post.title,
                    descricao: post.subtitle ?? "Leia esta publicação da ABRANB.",
                    href: `/${post.slug}`,
                    imageAlt: coverUrl ? (post.coverImage?.alt ?? post.title) : "Imagem indisponível",
                    imageFit: "cover",
                  }} />
                </li>
              );
            })}
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

