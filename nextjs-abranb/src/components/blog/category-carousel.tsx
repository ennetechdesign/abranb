"use client";

import type { Publication } from "@/sanity/publication";
import { getImageUrl } from "@/sanity/image";
import SlideShow, { type SlideShowNotice } from "@/app/home-sections/components/slide-show";

type CategoryCarouselProps = {
  categoryTitle: string;
  posts: Publication[];
  categorySlug: string;
  publicationType: "artigo" | "noticia";
  "aria-label"?: string;
};

export function CategoryCarousel({ categoryTitle, posts, "aria-label": ariaLabel }: CategoryCarouselProps) {
  const notices: SlideShowNotice[] = posts.map((post, index) => {
    const coverUrl = getImageUrl(post.coverImage, 900, 600);
    return {
      id: index + 1,
      foto: coverUrl ?? "/images/imagem-indisponivel.png",
      titulo: post.title,
      descricao: post.subtitle ?? "Leia esta publicação da ABRANB.",
      href: `/${post.slug}`,
      imageAlt: coverUrl ? (post.coverImage?.alt ?? post.title) : "Imagem indisponível",
      imageFit: "cover",
    };
  });

  return <SlideShow notices={notices} label={ariaLabel ?? `Destaques de ${categoryTitle}`} />;
}

