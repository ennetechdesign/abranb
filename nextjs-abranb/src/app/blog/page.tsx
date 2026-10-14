import type { Metadata } from "next";
import Link from "next/link";

import SecondaryHero from "@/components/secondary-hero";
import { resources } from "@/i18n/resources";
import { getServerLocale } from "@/lib/resolve-locale";
import { client } from "@/sanity/client";
import {
  PUBLICATIONS_QUERY,
  SANITY_REVALIDATE_OPTIONS,
  type Publication,
  type PublicationType,
} from "@/sanity/publication";
import { PublicationCard } from "./publication-card";

type PublicationFilter = "todas" | PublicationType;

const FILTERS: PublicationFilter[] = ["todas", "noticia", "artigo"];

function normalizeFilter(value: unknown): PublicationFilter {
  return value === "noticia" || value === "artigo" ? value : "todas";
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const copy = resources[locale].common;
  return {
    title: copy.blog_title,
    description: copy.blog_meta_description,
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string | string[] }>;
}) {
  const locale = await getServerLocale();
  const copy = resources[locale].common;
  const filter = normalizeFilter((await searchParams).tipo);

  let publications: Publication[] | null = null;
  try {
    publications = await client.fetch<Publication[]>(
      PUBLICATIONS_QUERY,
      { filter },
      SANITY_REVALIDATE_OPTIONS,
    );
  } catch {
    publications = null;
  }

  return (
    <>
      <SecondaryHero title={copy.blog_title} />
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <p className="text-lead text-muted-foreground max-w-3xl">{copy.blog_description}</p>

        <nav aria-label={copy.blog_filter_label} className="mt-6">
          <ul className="flex flex-wrap gap-2">
            {FILTERS.map((option) => {
              const isActive = option === filter;
              const label =
                option === "todas"
                  ? copy.blog_filter_all
                  : option === "noticia"
                    ? copy.blog_filter_noticia
                    : copy.blog_filter_artigo;
              return (
                <li key={option}>
                  <Link
                    href={option === "todas" ? "/blog" : `/blog?tipo=${option}`}
                    aria-current={isActive ? "page" : undefined}
                    className={
                      isActive
                        ? "bg-purple text-paper border-purple inline-block rounded-full border px-4 py-2 text-body font-bold"
                        : "border-border text-body hover:border-purple inline-block rounded-full border px-4 py-2 font-semibold"
                    }
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {publications === null ? (
          <section role="alert" aria-labelledby="blog-error" className="mt-10">
            <h2 id="blog-error" className="text-heading font-bold">
              {copy.blog_error_title}
            </h2>
            <p className="text-body text-muted-foreground mt-2">{copy.blog_error_body}</p>
          </section>
        ) : publications.length === 0 ? (
          <section aria-labelledby="blog-empty" className="mt-10">
            <h2 id="blog-empty" className="text-heading font-bold">
              {copy.blog_empty_title}
            </h2>
            <p className="text-body text-muted-foreground mt-2">{copy.blog_empty_body}</p>
          </section>
        ) : (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {publications.map((publication) => (
              <li key={publication._id} className="flex">
                <PublicationCard
                  publication={publication}
                  locale={locale}
                  labels={{
                    typeNoticia: copy.blog_type_noticia,
                    typeArtigo: copy.blog_type_artigo,
                    readMore: copy.blog_read_more,
                    readingTimeTemplate: copy.blog_reading_time,
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
