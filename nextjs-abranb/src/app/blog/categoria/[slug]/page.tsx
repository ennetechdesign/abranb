import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import TitleUnderline from "@/components/title-underline";
import { PublicationList } from "@/components/blog/publication-list";
import { CategoryFilter } from "@/components/blog/category-filter";
import { countPublicationsByCategory, fetchCategories, fetchCategoryBySlug, fetchPublicationsByCategory, POSTS_PER_PAGE } from "@/sanity/blog";

type PublicationType = "artigo" | "noticia";
const isPublicationType = (type: string | undefined): type is PublicationType => type === "artigo" || type === "noticia";

export async function generateMetadata({ params, searchParams }: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ type?: string }>;
}): Promise<Metadata> {
  const [{ slug }, { type: typeParam }] = await Promise.all([params, searchParams]);
  const type = isPublicationType(typeParam) ? typeParam : undefined;
  const category = await fetchCategoryBySlug(slug, type);
  if (!category) return { title: "Categoria não encontrada" };
  const label = category.publicationType === "noticia" ? "Notícias" : "Artigos";
  return { title: `${category.title} | ${label}`, description: `Publicações de ${label.toLowerCase()} da categoria ${category.title}.` };
}

export default async function CategoryPage({ params, searchParams }: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string | string[]; type?: string }>;
}) {
  const [{ slug }, { page: pageParam, type: typeParam }] = await Promise.all([params, searchParams]);
  const typeFilter = isPublicationType(typeParam) ? typeParam : undefined;
  if (typeParam && !typeFilter) notFound();
  const category = await fetchCategoryBySlug(slug, typeFilter);
  if (!category) notFound();

  const type: PublicationType = category.publicationType === "noticia" ? "noticia" : "artigo";
  const label = type === "noticia" ? "Notícias" : "Artigos";
  const [totalCount, categories] = await Promise.all([
    countPublicationsByCategory({ type, categoryId: category._id }),
    fetchCategories(type),
  ]);
  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);
  const parsedPage = typeof pageParam === "string" && /^\d+$/.test(pageParam) ? Number(pageParam) : 1;
  const validPage = Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const currentPage = totalPages === 0 ? 1 : Math.min(validPage, totalPages);
  const [posts] = await Promise.all([
    fetchPublicationsByCategory({ type, categoryId: category._id, offset: (currentPage - 1) * POSTS_PER_PAGE, limit: POSTS_PER_PAGE }),
  ]);
  const baseHref = `/blog/categoria/${slug}?type=${type}`;

  return <main className="min-h-screen w-full">
    <nav aria-label="Tipos de publicação e categorias" className="mx-auto flex w-full min-w-0 max-w-6xl flex-col items-center gap-y-3 px-4 pt-6 sm:flex-row sm:justify-between sm:gap-x-4 sm:px-5 sm:pt-9">
      <div className="flex shrink-0 items-center justify-center gap-2 sm:gap-5">
        <Link href="/blog/artigo" aria-current={type === "artigo" ? "page" : undefined} className={`shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-body font-medium sm:px-4 ${type === "artigo" ? "bg-gold text-deep shadow-sm" : "text-foreground hover:bg-surface-elevated"}`}>Artigos</Link>
        <Link href="/blog/noticia" aria-current={type === "noticia" ? "page" : undefined} className={`shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-body font-medium sm:px-4 ${type === "noticia" ? "bg-gold text-deep shadow-sm" : "text-foreground hover:bg-surface-elevated"}`}>Notícias</Link>
      </div>
      <div className="flex w-full justify-center sm:ml-auto sm:w-auto sm:justify-end"><CategoryFilter categories={categories} type={type} typeLabel={label} selectedCategorySlug={category.slug} aria-label={`Filtrar ${label.toLowerCase()} por categoria`} /></div>
    </nav>
    <section className="px-4 pb-14 pt-10 sm:px-6 sm:pt-14">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center sm:mb-10"><TitleUnderline title={category.title} color="title-decoration" position="center" /></div>
        <PublicationList posts={posts} currentPage={currentPage} totalPages={totalPages} totalCount={totalCount} baseHref={baseHref} emptyMessage={`Ainda não há ${label.toLowerCase()} nesta categoria.`} aria-label={`${label} da categoria ${category.title}`} />
      </div>
    </section>
  </main>;
}
