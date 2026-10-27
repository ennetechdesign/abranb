import type { Metadata } from "next";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import {
  PUBLICATION_DETAIL_QUERY,
  RELATED_PUBLICATIONS_QUERY,
  type Publication,
} from "@/sanity/publication";
import { getImageUrl } from "@/sanity/image";

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

  return <main className="min-h-screen w-full">
    <article className="px-4 pb-0 pt-8 sm:px-8 sm:pt-10">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold leading-tight text-gold sm:text-4xl lg:text-5xl">{post.title}</h1>
        <div className="mx-auto my-4 h-0.5 w-3/4 bg-gold sm:my-5" />
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
      <h2 className="mx-auto mb-8 w-fit border-b-2 border-gold px-1 pb-2 text-2xl font-bold text-gold sm:text-3xl">Descubra mais novidades</h2>
      <div className="mx-auto flex max-w-[1440px] snap-x gap-6 overflow-x-auto px-3 pb-3 scrollbar-hidden sm:gap-16">{related.slice(0, 2).map((item) => {
        const relatedCover = getImageUrl(item.coverImage, 600, 400);
        const relatedImage = relatedCover ?? "/images/imagem-indisponivel.png";
        return <Link key={item._id} href={`/${item.slug}`} className="group flex h-[190px] w-[min(82vw,670px)] flex-shrink-0 snap-center overflow-hidden sm:h-[210px] rounded-[32px] bg-lilac text-left shadow-sm transition-shadow hover:shadow-md sm:rounded-[42px]">{relatedImage && <div className="relative h-full w-[40%] flex-shrink-0 bg-[#eee]"><Image src={relatedImage} alt={relatedCover ? (item.coverImage?.alt || item.title) : "Imagem indisponível"} fill sizes="300px" className={relatedCover ? "object-cover" : "object-contain"} /></div>}<div className="flex min-w-0 flex-1 flex-col justify-center overflow-hidden p-3 sm:p-5"><h3 className="mb-2 line-clamp-2 break-words text-lg font-bold leading-tight text-deep group-hover:text-link sm:text-2xl">{item.title}</h3>{item.subtitle && <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.subtitle}</p>}</div></Link>;
      })}</div>
      <Link href={`/blog/${publicationType}`} className="mt-8 inline-flex rounded-full border border-purple bg-purple px-6 py-3 font-semibold text-white shadow-sm transition hover:brightness-95">Acessar {publicationType === "artigo" ? "todos os artigos" : "todas as notícias"} <span className="ml-2" aria-hidden="true">›</span></Link>
    </section>}
  </main>;
}









