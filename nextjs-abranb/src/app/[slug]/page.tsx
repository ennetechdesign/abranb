import type { Metadata } from "next";
import { groq, PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SlideShow, { type SlideShowNotice } from "@/app/home-sections/components/slide-show";
import Button from "@/components/button";
import { client } from "@/sanity/client";
import {
  PUBLISHED_CONDITION,
  PUBLICATION_DETAIL_QUERY,
  PUBLICATION_FIELDS,
  RELATED_PUBLICATIONS_QUERY,
  type Publication,
} from "@/sanity/publication";
import { getImageUrl } from "@/sanity/image";
import TitleUnderline from "@/components/title-underline";

const options = { next: { revalidate: 30 } };
const INDIVIDUAL_PUBLICATION_QUERY = groq`*[_type == "post" && slug.current == $slug && ${PUBLISHED_CONDITION}][0] {
  ${PUBLICATION_FIELDS},
  "references": references[]{ _key, title, url }
}`;

type PublicationDetail = Publication & {
  references?: { _key?: string; title: string; url: string }[] | null;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await client.fetch<Publication | null>(PUBLICATION_DETAIL_QUERY, await params, options);
  if (!post) return {};
  return { title: post.title, description: post.subtitle ?? post.title };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await client.fetch<PublicationDetail | null>(INDIVIDUAL_PUBLICATION_QUERY, { slug }, options);
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
        <div className="block mb-6"><TitleUnderline title={post.title} position="center"/></div>
        {post.subtitle && <p className="text-body leading-snug text-muted-foreground sm:text-lead">{post.subtitle}</p>}
        {post.category?.slug && <Link href={`/blog/categoria/${post.category.slug}?type=${publicationType}`} className="mt-3 inline-flex rounded-full bg-lilac px-4 py-1.5 text-caption font-semibold text-deep hover:bg-purple hover:text-white">{post.category.title}</Link>}
        <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-between gap-4 text-caption text-muted-foreground sm:mt-8">
          <div className="flex items-center gap-2">{authorImage ? <Image src={authorImage} alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover" /> : <Image src="/logo.jpeg" alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover" />}{post.authorLink ? <a href={post.authorLink} target="_blank" rel="noopener noreferrer" className="underline decoration-link underline-offset-2">{post.authorName || "Abranb"}</a> : <span>{post.authorName || "Abranb"}</span>}</div>
          <span>{readingMinutes} minuto{readingMinutes === 1 ? "" : "s"} de leitura{dateLabel ? ` · ${dateLabel}` : ""}</span>
        </div>
      </header>
      {imageUrl && <div className={`relative mx-auto mt-7 w-full overflow-hidden rounded-[28px] bg-[#eee] sm:mt-8 sm:rounded-[40px] ${coverUrl ? "aspect-[2.5/1] max-w-6xl" : "aspect-[4/3] max-w-2xl"}`}><Image src={imageUrl} alt={imageAlt} fill priority sizes="(max-width: 768px) 100vw, 1200px" className={coverUrl ? "object-cover" : "object-contain"} /></div>}
      <div className="publication-content mx-auto max-w-[680px] py-8 text-body text-foreground sm:py-10">
        {Array.isArray(post.body) && <PortableText value={post.body} components={{
          block: {
            h2: ({ children }) => <h2 style={{ color: "var(--foreground)", fontSize: "var(--font-size-xx-large)", fontWeight: 700, lineHeight: 1.25, margin: "1.75rem 0 0.75rem" }}>{children}</h2>,
            h3: ({ children }) => <h3 style={{ color: "var(--foreground)", fontSize: "var(--font-size-x-large)", fontWeight: 700, lineHeight: 1.25, margin: "1.75rem 0 0.75rem" }}>{children}</h3>,
            h4: ({ children }) => <h4 style={{ color: "var(--foreground)", fontSize: "var(--font-size-large)", fontWeight: 700, lineHeight: 1.25, margin: "1.75rem 0 0.75rem" }}>{children}</h4>,
            blockquote: ({ children }) => <blockquote style={{ borderLeft: "4px solid var(--title-decoration)", color: "var(--muted-foreground)", margin: "1.5rem 0", paddingLeft: "1rem" }}>{children}</blockquote>,
          },
          list: {
            bullet: ({ children }) => <ul style={{ listStyleType: "disc", margin: "1.25rem 0", paddingLeft: "1.75rem" }}>{children}</ul>,
            number: ({ children }) => <ol style={{ listStyleType: "decimal", margin: "1.25rem 0", paddingLeft: "1.75rem" }}>{children}</ol>,
          },
          listItem: {
            bullet: ({ children }) => <li style={{ margin: "0.4rem 0", paddingLeft: "0.25rem" }}>{children}</li>,
            number: ({ children }) => <li style={{ margin: "0.4rem 0", paddingLeft: "0.25rem" }}>{children}</li>,
          },
          types: {
            bodyImage: ({ value }) => {
              const image = value as unknown as { alt?: string; caption?: string };
              const bodyImageUrl = getImageUrl(value, 1400, 1050);
              if (!bodyImageUrl) return null;
              return <figure className="my-8">
                <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface-elevated">
                  <Image src={bodyImageUrl} alt={image.alt ?? ""} fill sizes="(max-width: 768px) 100vw, 680px" className="object-contain" />
                </div>
                {image.caption && <figcaption className="mt-2 text-center text-caption text-muted-foreground">{image.caption}</figcaption>}
              </figure>;
            },
          },
          marks: {
            code: ({ children }) => <code className="publication-inline-code" style={{ borderRadius: "0.25rem", background: "var(--surface-elevated)", padding: "0.125rem 0.375rem", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: "0.9em" }}>{children}</code>,
            link: ({ children, value }) => {
              const link = value as { href?: string; blank?: boolean };
              return link.href ? <a href={link.href} target={link.blank ? "_blank" : undefined} rel={link.blank ? "noopener noreferrer" : undefined}>{children}</a> : <>{children}</>;
            },
          },
        }} />}
      </div>
      {post.references?.length ? <section aria-labelledby="publication-references" className="mx-auto max-w-[680px] border-t border-border-subtle py-6 sm:py-8">
        <h2 id="publication-references" className="mb-4 text-title font-bold text-foreground">Fontes e referências</h2>
        <ol className="list-decimal space-y-2 pl-6 text-body leading-relaxed text-muted-foreground">
          {post.references.map((reference, index) => <li key={reference._key ?? `${reference.url}-${index}`}>
            <a href={reference.url} target="_blank" rel="noopener noreferrer" className="text-link underline underline-offset-2">{reference.title}</a>
          </li>)}
        </ol>
      </section> : null}
    </article>
    {related.length > 0 && <section className="bg-lilac/20 px-4 py-10 text-center sm:px-8 sm:py-14">
      <div className="mb-8 text-center"><TitleUnderline title="Descubra mais novidades" position="center" /></div>
      <div className="mx-auto w-full max-w-[1440px] min-w-0"><SlideShow notices={relatedSlides} label="Publicações relacionadas" /></div>
      <div className="mt-8 flex justify-center"><Button variant="gold-to-purple" href={`/blog/${publicationType}`}>Acessar {publicationType === "artigo" ? "todos os artigos" : "todas as notícias"}</Button></div>
    </section>}
  </main>;
}









