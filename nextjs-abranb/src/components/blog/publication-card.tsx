import Link from "next/link";
import Image from "next/image";
import type { Publication } from "@/sanity/publication";
import { getImageUrl } from "@/sanity/image";

const COVER_FALLBACK = "/images/imagem-indisponivel.png";
type PublicationCardProps = { post: Publication };

export function PublicationCard({ post }: PublicationCardProps) {
  const coverUrl = getImageUrl(post.coverImage, 700, 500);
  const imageUrl = coverUrl ?? COVER_FALLBACK;
  const imageAlt = coverUrl ? (post.coverImage?.alt || post.title) : "Imagem indisponível";
  const displayDate = post.originalPublishedAt || post.scheduledAt;
  const dateLabel = displayDate ? new Date(displayDate).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }) : null;
  return <Link href={`/${post.slug}`} className="block" aria-label={post.title}>
    <article className="publication-card group flex h-[360px] min-w-0 flex-col overflow-hidden rounded-[30px] bg-lilac text-ink shadow-sm transition-colors duration-300 hover:bg-purple hover:text-white hover:shadow-md focus-visible:outline-2 focus-visible:outline-focus-ring sm:rounded-[42px] lg:h-[280px] lg:flex-row">
      <div className="relative h-[190px] w-full shrink-0 bg-[#eee] lg:h-full lg:w-[40%]"><Image src={imageUrl} alt={imageAlt} fill sizes="(max-width: 1023px) 86vw, 400px" className={coverUrl ? "object-cover" : "object-contain"} loading="lazy" /></div>
      <div className="flex h-[170px] min-h-0 min-w-0 flex-1 flex-col justify-center overflow-hidden p-4 sm:p-5 lg:h-full lg:p-7">
        {post.category?.title && <p className="mb-1 line-clamp-1 break-words text-caption font-semibold text-link group-hover:text-white">{post.category.title}</p>}
        <h2 className="publication-card-title mb-1 line-clamp-2 break-words text-body font-bold leading-tight text-deep group-hover:text-white sm:mb-2 sm:text-title">{post.title}</h2>
        {post.subtitle && <p className="publication-card-subtitle line-clamp-3 break-words text-caption leading-relaxed text-muted-foreground group-hover:text-white sm:text-body">{post.subtitle}</p>}
        {dateLabel && <time dateTime={displayDate ?? undefined} className="publication-card-subtitle mt-1 line-clamp-1 text-caption text-muted-foreground group-hover:text-white sm:hidden">{dateLabel}</time>}
      </div>
    </article>
  </Link>;
}
