import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import TitleUnderline from "@/components/title-underline";
import { PublicationList } from "@/components/blog/publication-list";
import { countPublicationsByCategory, fetchCategoryBySlug, fetchPublicationsByCategory, POSTS_PER_PAGE } from "@/sanity/blog";

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
  const totalCount = await countPublicationsByCategory({ type, categoryId: category._id });
  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);
  const parsedPage = typeof pageParam === "string" && /^\d+$/.test(pageParam) ? Number(pageParam) : 1;
  const validPage = Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const currentPage = totalPages === 0 ? 1 : Math.min(validPage, totalPages);
  const [posts] = await Promise.all([
    fetchPublicationsByCategory({ type, categoryId: category._id, offset: (currentPage - 1) * POSTS_PER_PAGE, limit: POSTS_PER_PAGE }),
  ]);
  const baseHref = `/blog/categoria/${slug}?type=${type}`;

  return <main className="min-h-screen w-full">
    <nav aria-label="Tipos de publicação" className="mx-auto flex w-full max-w-6xl items-center gap-3 px-5 pt-7 sm:gap-5 sm:pt-9">
      <Link href="/blog/artigo" aria-current={type === "artigo" ? "page" : undefined} className={`rounded-full px-4 py-2 text-sm font-medium sm:text-lg ${type === "artigo" ? "bg-gold text-deep shadow-sm" : "text-foreground hover:bg-surface-elevated"}`}>Artigos</Link>
      <Link href="/blog/noticia" aria-current={type === "noticia" ? "page" : undefined} className={`rounded-full px-4 py-2 text-sm font-medium sm:text-lg ${type === "noticia" ? "bg-gold text-deep shadow-sm" : "text-foreground hover:bg-surface-elevated"}`}>Notícias</Link>
    </nav>
    <section className="px-4 pb-14 pt-10 sm:px-6 sm:pt-14">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center sm:mb-10"><TitleUnderline title={category.title} color="title-decoration" position="center" /><p className="mt-3 text-sm text-muted-foreground sm:text-base">Lista completa de {label.toLowerCase()}</p></div>
        <PublicationList posts={posts} currentPage={currentPage} totalPages={totalPages} totalCount={totalCount} baseHref={baseHref} emptyMessage={`Ainda não há ${label.toLowerCase()} nesta categoria.`} aria-label={`${label} da categoria ${category.title}`} />
      </div>
    </section>
  </main>;
}
