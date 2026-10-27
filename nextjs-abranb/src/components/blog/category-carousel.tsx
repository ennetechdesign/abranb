"use client";

import Link from "next/link";
import Image from "next/image";
import type { Publication } from "@/sanity/publication";
import { getImageUrl } from "@/sanity/image";
import { useCarousel } from "@/hooks/useCarousel";

type CategoryCarouselProps = {
  categoryTitle: string;
  posts: Publication[];
  categorySlug: string;
  publicationType: "artigo" | "noticia";
  "aria-label"?: string;
};

export function CategoryCarousel({ categoryTitle, posts, categorySlug, publicationType, "aria-label": ariaLabel }: CategoryCarouselProps) {
  const { activeIndex, slideRef, handleMouseDown, handleMouseMove, handleMouseUp, handleRadioChange } = useCarousel(posts.length, 900);
  return <section aria-label={ariaLabel ?? `Destaques de ${categoryTitle}`}>
    <div ref={slideRef} className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 py-2 scrollbar-hidden sm:gap-7" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} role="region" aria-roledescription="carrossel">
      {posts.map((post) => {
        const imageUrl = getImageUrl(post.coverImage, 800, 500);
        return <Link key={post._id} href={`/${post.slug}`} aria-label={post.title} className="group block w-[min(88vw,900px)] flex-shrink-0 snap-center">
          <article className="flex min-h-[164px] overflow-hidden rounded-[30px] bg-lilac shadow-sm transition-shadow hover:shadow-md sm:min-h-[250px] sm:rounded-[48px]">
            {imageUrl && <div className="relative w-[42%] flex-shrink-0"><Image src={imageUrl} alt={post.coverImage?.alt || post.title} fill sizes="(max-width: 640px) 42vw, 380px" className="object-cover" loading="lazy" /></div>}
            <div className="flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-7 lg:p-9"><h2 className="mb-1.5 line-clamp-2 text-base font-bold leading-tight text-deep group-hover:text-link sm:mb-2 sm:text-3xl">{post.title}</h2>{post.subtitle && <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-xl sm:leading-relaxed">{post.subtitle}</p>}</div>
          </article>
        </Link>;
      })}
    </div>
    {posts.length > 1 && <div className="mt-5 flex justify-center gap-3" aria-label="Selecionar notícia">{posts.map((post, index) => <button key={post._id} onClick={() => handleRadioChange(index)} aria-label={`Ir para ${post.title}`} aria-pressed={activeIndex === index} className={`h-5 w-5 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-focus-ring ${activeIndex === index ? "bg-purple" : "bg-lilac hover:bg-purple/60"}`} />)}</div>}
    <div className="sr-only"><Link href={`/blog/${publicationType}/categoria/${categorySlug}`}>Ver todas da categoria</Link></div>
  </section>;
}

