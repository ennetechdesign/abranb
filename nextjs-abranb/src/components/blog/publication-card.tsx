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
    <article className="group flex min-h-[180px] overflow-hidden rounded-[34px] bg-lilac shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-focus-ring sm:min-h-[250px] sm:rounded-[48px]">
      <div className="relative w-[38%] flex-shrink-0 sm:w-[40%]"><Image src={imageUrl} alt={imageAlt} fill sizes="(max-width: 640px) 38vw, 400px" className="object-cover" loading="lazy" /></div>
      <div className="flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-6 lg:p-8">
        {post.category?.title && <p className="mb-1 text-xs font-semibold text-link sm:text-sm">{post.category.title}</p>}
        <h2 className="mb-1.5 line-clamp-2 text-lg font-bold leading-tight text-deep group-hover:text-link sm:mb-2 sm:text-3xl">{post.title}</h2>
        {post.subtitle && <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-xl sm:leading-relaxed">{post.subtitle}</p>}
        {dateLabel && <time dateTime={displayDate ?? undefined} className="mt-2 text-xs text-muted-foreground sm:hidden">{dateLabel}</time>}
      </div>
    </article>
  </Link>;
}
