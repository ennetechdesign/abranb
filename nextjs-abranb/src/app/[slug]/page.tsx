import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import { PortableTextContent } from "@/components/portable-text-content";
import { resources } from "@/i18n/resources";
import {
  estimateReadingTime,
  extractPlainText,
  formatPublishDate,
  formatRelativePublishDate,
} from "@/lib/publication";
import { getServerLocale } from "@/lib/resolve-locale";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import {
  PUBLICATION_DETAIL_QUERY,
  RECENT_PUBLICATIONS_QUERY,
  RELATED_PUBLICATIONS_QUERY,
  SANITY_REVALIDATE_OPTIONS,
  type Publication,
} from "@/sanity/publication";
import { PublicationCard } from "@/app/blog/publication-card";

/** Evita buscar a mesma publicação duas vezes (metadados + página). */
const getPublication = cache((slug: string) => {
  return client.fetch<Publication | null>(
    PUBLICATION_DETAIL_QUERY,
    { slug },
    SANITY_REVALIDATE_OPTIONS,
  );
});

/** Prioriza o mesmo tipo; completa com recentes até 3, sem repetir a atual. */
async function getRelatedPublications(post: Publication): Promise<Publication[]> {
  const sameType =
    post.publicationType != null
      ? await client.fetch<Publication[]>(
          RELATED_PUBLICATIONS_QUERY,
          { slug: post.slug, publicationType: post.publicationType },
          SANITY_REVALIDATE_OPTIONS,
        )
      : [];
  if (sameType.length >= 3) {
    return sameType;
  }
  const exclude = [post.slug, ...sameType.map((item) => item.slug)];
  const recent = await client.fetch<Publication[]>(
    RECENT_PUBLICATIONS_QUERY,
    { exclude },
    SANITY_REVALIDATE_OPTIONS,
  );
  return [...sameType, ...recent].slice(0, 3);
}

function getExcerpt(post: Publication): string {
  if (post.subtitle) {
    return post.subtitle;
  }
  const text = extractPlainText(post.body).replace(/\s+/g, " ").trim();
  return text.length > 160 ? `${text.slice(0, 157).trimEnd()}…` : text || post.title;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublication(slug);
  if (!post) {
    return {};
  }
  const description = getExcerpt(post);
  const coverUrl = post.coverImage
    ? (urlFor(post.coverImage)?.width(1200).height(630).url() ?? undefined)
    : undefined;
  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      images: coverUrl
        ? [{ url: coverUrl, alt: post.coverImage?.alt || post.title }]
        : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const locale = await getServerLocale();
  const copy = resources[locale].common;
  const { slug } = await params;
  const post = await getPublication(slug);
  if (!post) {
    notFound();
  }

  const related = await getRelatedPublications(post);

  const coverUrl = post.coverImage
    ? (urlFor(post.coverImage)?.width(1200).url() ?? null)
    : null;
  const authorPhotoUrl = post.authorPhoto
    ? (urlFor(post.authorPhoto)?.width(96).height(96).url() ?? null)
    : null;
  const minutes = estimateReadingTime(post.body);
  const absoluteDate = formatPublishDate(post.publishedAt, locale, "long");
  const relativeDate = formatRelativePublishDate(post.publishedAt, { locale });
  const typeLabel =
    post.publicationType === "artigo" ? copy.blog_type_artigo : copy.blog_type_noticia;
  const authorLinkLabel = post.authorName
    ? copy.blog_author_link_label.replace("{name}", post.authorName)
    : "";

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10">
      <header className="flex flex-col gap-4">
        <p>
          <span className="border-purple text-caption inline-block rounded-full border px-3 py-1 font-bold tracking-wide uppercase">
            {typeLabel}
          </span>
        </p>
        <h1 className="text-display font-bold text-balance">{post.title}</h1>
        {post.subtitle ? (
          <p className="text-lead text-muted-foreground">{post.subtitle}</p>
        ) : null}

        <div className="flex items-center gap-3">
          {authorPhotoUrl ? (
            <Image
              src={authorPhotoUrl}
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 rounded-full object-cover"
            />
          ) : null}
          <div className="flex flex-col">
            {post.authorName ? (
              post.authorLink ? (
                <a
                  href={post.authorLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={authorLinkLabel}
                  className="text-body text-link font-bold underline underline-offset-2"
                >
                  {post.authorName}
                </a>
              ) : (
                <span className="text-body font-bold">{post.authorName}</span>
              )
            ) : null}
            <p className="text-caption text-muted-foreground">
              {absoluteDate ? <time dateTime={post.publishedAt}>{absoluteDate}</time> : null}
              {absoluteDate && relativeDate ? " · " : null}
              {relativeDate ? <span>{relativeDate}</span> : null}
              {minutes > 0 ? (
                <span>
                  {absoluteDate || relativeDate ? " · " : null}
                  {copy.blog_reading_time.replace("{minutes}", String(minutes))}
                </span>
              ) : null}
            </p>
          </div>
        </div>

        {coverUrl ? (
          <figure className="mt-2">
            <Image
              src={coverUrl}
              alt={post.coverImage?.alt || post.title}
              width={1200}
              height={675}
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              className="h-auto w-full rounded-2xl"
            />
          </figure>
        ) : null}
      </header>

      <div className="mt-6">
        <PortableTextContent value={post.body} />
      </div>

      <footer className="mt-10 flex flex-col gap-8">
        <p>
          <Link href="/blog" className="text-link text-body font-bold hover:underline">
            {copy.blog_back_to_list}
          </Link>
        </p>
        {related.length > 0 ? (
          <section aria-labelledby="related-publications">
            <h2 id="related-publications" className="text-heading mb-4 font-bold">
              {copy.blog_related_title}
            </h2>
            <ul className="grid gap-6 sm:grid-cols-2">
              {related.map((item) => (
                <li key={item._id} className="flex">
                  <PublicationCard
                    publication={item}
                    locale={locale}
                    titleHeadingLevel={3}
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
          </section>
        ) : null}
      </footer>
    </article>
  );
}
