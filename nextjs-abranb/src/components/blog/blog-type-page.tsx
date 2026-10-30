import Link from "next/link";
import SlideShow, { type SlideShowNotice } from "@/app/home-sections/components/slide-show";
import { CategoryFilter } from "@/components/blog/category-filter";
import { getImageUrl } from "@/sanity/image";
import {
  countPublicationsByCategory,
  fetchCategories,
  fetchPublicationsByCategory,
  type PublicationCategory,
} from "@/sanity/blog";
import type { Publication } from "@/sanity/publication";
import Button from "../button";

const LABELS = { artigo: "Artigos", noticia: "Notícias" } as const;
type PublicationType = keyof typeof LABELS;
const CATEGORY_SLIDES = 3;
const COVER_FALLBACK = "/images/imagem-indisponivel.png";

function toSlides(posts: Publication[]): SlideShowNotice[] {
  return posts.map((post, index) => {
    const coverUrl = getImageUrl(post.coverImage, 900, 600);
    return {
      id: index + 1,
      foto: coverUrl ?? COVER_FALLBACK,
      titulo: post.title,
      descricao: post.subtitle ?? "Leia esta publicação da ABRANB.",
      href: `/${post.slug}`,
      imageAlt: coverUrl ? (post.coverImage?.alt ?? post.title) : "Imagem indisponível",
      imageFit: "cover",
    };
  });
}
function BlogTabs({ type, categories }: { type: PublicationType; categories: PublicationCategory[] }) {
  return <nav aria-label="Tipos de publicação e categorias" className="mx-auto flex w-full min-w-0 max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 pt-6 sm:px-5 sm:pt-9">
    <div className="flex shrink-0 items-center gap-2 sm:gap-5">
      {(["artigo", "noticia"] as const).map((item) => <Link key={item} href={`/blog/${item}`} aria-current={type === item ? "page" : undefined} className={`shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium sm:px-4 sm:text-lg ${type === item ? "bg-gold text-deep shadow-sm" : "text-foreground hover:bg-surface-elevated"}`}>{LABELS[item]}</Link>)}
    </div>
    <div className="ml-auto shrink-0"><CategoryFilter categories={categories} type={type} typeLabel={LABELS[type]} aria-label={`Filtrar ${LABELS[type].toLowerCase()} por categoria`} /></div>
  </nav>;
}

export async function BlogTypePage({ type }: {
  type: PublicationType;
}) {
  const label = LABELS[type];
  const categories = await fetchCategories(type);

  const categorySections = await Promise.all(categories.map(async (category) => {
    const [posts, totalCount] = await Promise.all([
      fetchPublicationsByCategory({ type, categoryId: category._id, offset: 0, limit: CATEGORY_SLIDES }),
      countPublicationsByCategory({ type, categoryId: category._id }),
    ]);
    return { category, posts, totalCount };
  }));
  const populatedCategories = categorySections.filter(({ posts }) => posts.length > 0);

  return <main className="min-h-screen w-full"><BlogTabs type={type} categories={categories} /><div className="pb-10 pt-3 sm:pb-16">{populatedCategories.map(({ category, posts, totalCount }, index) => <section key={category._id} className={`flex flex-col items-center px-4 py-9 sm:px-6 sm:py-12 ${index % 2 ? "bg-lilac/20" : "bg-background"}`}>
    <h2 className="mb-7 max-w-full border-b-2 border-title-decoration px-1 pb-2 text-center text-xl font-bold text-title-decoration sm:mb-9 sm:text-3xl">{category.title}</h2>
    <div className="w-full mb-14"><SlideShow notices={toSlides(posts)} label={`${label}: ${category.title}`} /></div>
    <Button variant="gold-to-purple" href={`/blog/categoria/${category.slug}?type=${type}`}>
      Acessar lista completa
      <span className="sr-only"> de {category.title} ({totalCount} publicações)</span>
    </Button>
  </section>)}{populatedCategories.length === 0 && <p className="py-16 text-center text-lead text-muted-foreground">Ainda não há {label.toLowerCase()} publicados.</p>}</div></main>;
}
