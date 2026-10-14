import Image from "next/image";
import Link from "next/link";

import type { Publication } from "@/sanity/publication";
import { urlFor } from "@/sanity/image";
import {
  estimateReadingTime,
  formatPublishDate,
  formatRelativePublishDate,
  type RelativeDateLocale,
} from "@/lib/publication";

export type PublicationCardLabels = {
  typeNoticia: string;
  typeArtigo: string;
  readMore: string;
  /** Modelo com `{minutes}`, ex. "{minutes} min de leitura". */
  readingTimeTemplate: string;
};

function AuthorInitials({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <span
      aria-hidden
      className="bg-purple text-paper flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-body font-bold"
    >
      {initials}
    </span>
  );
}

export function PublicationCard({
  publication,
  locale,
  labels,
  titleHeadingLevel = 2,
}: {
  publication: Publication;
  locale: RelativeDateLocale;
  labels: PublicationCardLabels;
  titleHeadingLevel?: 2 | 3;
}) {
  const href = `/${publication.slug}`;
  const typeLabel =
    publication.publicationType === "artigo" ? labels.typeArtigo : labels.typeNoticia;
  const coverUrl = publication.coverImage
    ? (urlFor(publication.coverImage)?.width(800).height(450).url() ?? null)
    : null;
  const authorPhotoUrl = publication.authorPhoto
    ? (urlFor(publication.authorPhoto)?.width(96).height(96).url() ?? null)
    : null;
  const minutes = estimateReadingTime(publication.body);
  const absoluteDate = formatPublishDate(publication.publishedAt, locale, "long");
  const relativeDate = formatRelativePublishDate(publication.publishedAt, { locale });
  const TitleTag = titleHeadingLevel === 3 ? "h3" : "h2";

  return (
    <article className="border-border bg-surface-elevated relative flex w-full flex-col overflow-hidden rounded-4xl border transition-shadow hover:shadow-lg">
      {coverUrl ? (
        <Image
          src={coverUrl}
          alt={publication.coverImage?.alt || publication.title}
          width={800}
          height={450}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="aspect-video w-full object-cover"
        />
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p>
          <span className="border-purple text-caption inline-block rounded-full border px-3 py-1 font-bold tracking-wide uppercase">
            {typeLabel}
          </span>
        </p>
        <TitleTag className="text-lead font-bold text-balance">
          <Link
            href={href}
            className="after:absolute after:inset-0 hover:underline focus-visible:underline"
          >
            {publication.title}
          </Link>
        </TitleTag>
        {publication.subtitle ? (
          <p className="text-body text-muted-foreground line-clamp-3">{publication.subtitle}</p>
        ) : null}
        <div className="mt-auto flex flex-col gap-3 pt-2">
          {publication.authorName ? (
            <p className="flex items-center gap-2">
              {authorPhotoUrl ? (
                <Image
                  src={authorPhotoUrl}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 rounded-full object-cover"
                />
              ) : (
                <AuthorInitials name={publication.authorName} />
              )}
              <span className="text-body font-semibold">{publication.authorName}</span>
            </p>
          ) : null}
          <p className="text-caption text-muted-foreground">
            {absoluteDate ? (
              <time dateTime={publication.publishedAt}>{absoluteDate}</time>
            ) : null}
            {absoluteDate && relativeDate ? " · " : null}
            {relativeDate ? <span>{relativeDate}</span> : null}
            {minutes > 0 ? (
              <span>
                {absoluteDate || relativeDate ? " · " : null}
                {labels.readingTimeTemplate.replace("{minutes}", String(minutes))}
              </span>
            ) : null}
          </p>
          <p aria-hidden className="text-body text-link font-bold">
            {labels.readMore} →
          </p>
        </div>
      </div>
    </article>
  );
}
