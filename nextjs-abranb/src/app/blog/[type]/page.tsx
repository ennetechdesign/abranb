import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogTypePage } from "@/components/blog/blog-type-page";

type PublicationType = "artigo" | "noticia";
const isPublicationType = (type: string): type is PublicationType => type === "artigo" || type === "noticia";

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params;
  if (!isPublicationType(type)) return { title: "Página não encontrada" };
  return { title: type === "artigo" ? "Artigos" : "Notícias", description: `Publicações da ABRANB: ${type === "artigo" ? "artigos" : "notícias"}, organizadas por categoria.` };
}

export default async function PublicationTypeRoute({ params, searchParams }: {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ view?: string; page?: string }>;
}) {
  const [{ type }, query] = await Promise.all([params, searchParams]);
  if (!isPublicationType(type)) notFound();
  return <BlogTypePage type={type} pageParam={query.page} showAll={query.view === "todos"} />;
}


