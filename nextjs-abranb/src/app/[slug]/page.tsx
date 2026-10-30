import type { Metadata } from "next";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import Image from "next/image";
import SlideShow, { type SlideShowNotice } from "@/app/home-sections/components/slide-show";
import Button from "@/components/button";
import { client } from "@/sanity/client";
import {
  PUBLICATION_DETAIL_QUERY,
  RELATED_PUBLICATIONS_QUERY,
  type Publication,
} from "@/sanity/publication";
import { getImageUrl } from "@/sanity/image";
import TitleUnderline from "@/components/title-underline";

const options = { next: { revalidate: 30 } };

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await client.fetch<Publication | null>(PUBLICATION_DETAIL_QUERY, await params, options);
  if (!post) return {};
  return { title: post.title, description: post.subtitle ?? post.title };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await client.fetch<Publication | null>(PUBLICATION_DETAIL_QUERY, { slug }, options);
  if (!post) notFound();
  const publicationType = post.publicationType === "artigo" ? "artigo" : "noticia";
  const related = await client.fetch<Publication[]>(RELATED_PUBLICATIONS_QUERY, { slug, publicationType }, options);
  const coverUrl = getImageUrl(post.coverImage, 1600, 700);
  const imageUrl = coverUrl ?? "/images/imagem-indisponivel.png";
  const imageAlt = coverUrl ? (post.coverImage?.alt || post.title) : "Imagem indisponível";
  const authorImage = getImageUrl(post.authorPhoto, 64, 64);
  const displayDate = post.originalPublishedAt || post.scheduledAt;
  const dateLabel = displayDate ? new Date(displayDate).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }) : null;
  const text = JSON.stringify(post.body ?? []);
  const readingMinutes = Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
  const relatedSlides: SlideShowNotice[] = related.map((item, index) => {
    const relatedCover = getImageUrl(item.coverImage, 900, 600);
    return {
      id: index + 1,
      foto: relatedCover ?? "/images/imagem-indisponivel.png",
      titulo: item.title,
      descricao: item.subtitle ?? "Leia esta publicação da ABRANB.",
      href: `/${item.slug}`,
      imageAlt: relatedCover ? (item.coverImage?.alt || item.title) : "Imagem indisponível",
      imageFit: "cover",
    };
  });

  return <main className="min-h-screen w-full">
    <article className="px-4 pb-0 pt-8 sm:px-8 sm:pt-10">
      <header className="mx-auto max-w-3xl text-center">
        <TitleUnderline title={post.title} position="center"/>
        {post.subtitle && <p className="text-base leading-snug text-muted-foreground sm:text-xl">{post.subtitle}</p>}
        <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground sm:mt-8 sm:text-sm">
          <div className="flex items-center gap-2">{authorImage ? <Image src={authorImage} alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover" /> : <Image src="/logo.jpeg" alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover" />}<span>{post.authorName || "Abranb"}</span></div>
          <span>{readingMinutes} minuto{readingMinutes === 1 ? "" : "s"} de leitura{dateLabel ? ` · ${dateLabel}` : ""}</span>
        </div>
      </header>
      {imageUrl && <div className={`relative mx-auto mt-7 w-full overflow-hidden rounded-[28px] bg-[#eee] sm:mt-8 sm:rounded-[40px] ${coverUrl ? "aspect-[2.5/1] max-w-6xl" : "aspect-[4/3] max-w-2xl"}`}><Image src={imageUrl} alt={imageAlt} fill priority sizes="(max-width: 768px) 100vw, 1200px" className={coverUrl ? "object-cover" : "object-contain"} /></div>}
      <div className="prose prose-lg mx-auto max-w-[680px] py-8 text-foreground prose-p:my-5 prose-p:leading-[1.8] prose-a:text-link prose-a:underline prose-headings:text-foreground prose-img:mx-auto prose-img:rounded-[32px] sm:py-10">
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
    </article>
    {related.length > 0 && <section className="bg-lilac/20 px-4 py-10 text-center sm:px-8 sm:py-14">
      <div className="mb-8 text-center"><TitleUnderline title="Descubra mais novidades" position="center" /></div>
      <div className="mx-auto w-full max-w-[1440px] min-w-0"><SlideShow notices={relatedSlides} label="Publicações relacionadas" /></div>
      <div className="mt-8 flex justify-center"><Button variant="gold-to-purple" href={`/blog/${publicationType}`}>Acessar {publicationType === "artigo" ? "todos os artigos" : "todas as notícias"}</Button></div>
    </section>}
  </main>;
}









