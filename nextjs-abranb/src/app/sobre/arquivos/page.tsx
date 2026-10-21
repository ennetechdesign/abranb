import type { Metadata } from "next";
import Image from "next/image";

import SecondaryHero from "@/components/secondary-hero";
import TitleUnderline from "@/components/title-underline";
import { FileLinesIcon } from "@/components/button";
import { resources, type LocaleResource } from "@/i18n/resources";
import { getServerLocale } from "@/lib/resolve-locale";
import { buildLocaleMetadata } from "@/lib/page-metadata";

import {
  allArticlesUrl,
  allBooksUrl,
  articles,
  books,
  imageGrid2,
  imageGrid3,
  imagePair,
  imageWide,
  videos,
  type ArchiveImage,
} from "./data";

import "./arquivos.css";

type Arquivos = LocaleResource<"arquivos">;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return buildLocaleMetadata(locale, "arquivos");
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="currentColor" aria-hidden>
      <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z" />
    </svg>
  );
}

function GalleryImage({ image, className }: { image: ArchiveImage; className?: string }) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes="(min-width: 896px) 288px, 33vw"
      className={className}
    />
  );
}

function ArquivosContent({ copy }: { copy: Arquivos }) {
  return (
    <>
      <SecondaryHero title={copy.hero_title} />

      <section className="arq-section arq-section--page" aria-labelledby="arq-imagens">
        <div className="arq-inner arq-inner--wide">
          <div id="arq-imagens">
            <TitleUnderline title={copy.imagens_title} position="center" />
          </div>

          <ul className="arq-grid arq-grid--3">
            {imageGrid3.map((image) => (
              <li key={image.src}>
                <GalleryImage image={image} className="arq-photo arq-photo--portrait" />
              </li>
            ))}
          </ul>

          <ul className="arq-grid arq-grid--2">
            {imageGrid2.map((image) => (
              <li key={image.src}>
                <GalleryImage image={image} className="arq-photo arq-photo--landscape" />
              </li>
            ))}
          </ul>

          <div className="arq-pair-block">
            <ul className="arq-pair">
              {imagePair.map((image) => (
                <li key={image.src}>
                  <GalleryImage image={image} className="arq-photo arq-photo--natural" />
                </li>
              ))}
            </ul>

            <GalleryImage image={imageWide} className="arq-photo arq-photo--wide" />
          </div>
        </div>
      </section>

      <section className="arq-section arq-section--videos" aria-labelledby="arq-videos">
        <div className="arq-inner">
          <div id="arq-videos">
            <TitleUnderline title={copy.videos_title} position="center" color="gold" />
          </div>
          <ul className="arq-videos">
            {videos.map((video) => (
              <li key={video.url}>
                <a href={video.url} target="_blank" rel="noopener noreferrer" className="arq-video">
                  <span className="arq-video-media">
                    <Image
                      src={video.thumbnail}
                      alt=""
                      width={video.width}
                      height={video.height}
                      className={
                        video.trimTransparentEdge
                          ? "arq-video-thumb arq-video-thumb--trim"
                          : "arq-video-thumb"
                      }
                    />
                  </span>
                  <span className="arq-video-title">{video.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="arq-section arq-section--page arq-section--books" aria-labelledby="arq-livros">
        <div className="arq-inner arq-inner--books">
          <div id="arq-livros">
            <TitleUnderline title={copy.livros_title} position="center" />
          </div>
          <ul className="arq-books">
            {books.map((book) => (
              <li key={book.url} className="arq-book">
                <Image
                  src={book.cover}
                  alt={`${copy.book_cover_alt} ${book.title}`}
                  width={book.width}
                  height={book.height}
                  className="arq-book-cover"
                />
                <div className="arq-book-body">
                  <p className="arq-book-abstract">{book.abstract}</p>
                  <a href={book.url} target="_blank" rel="noopener noreferrer" className="arq-book-link">
                    <FileLinesIcon className="arq-icon" />
                    {copy.book_link}
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <a href={allBooksUrl} target="_blank" rel="noopener noreferrer" className="arq-all-link">
            {copy.all_books_link}
            <ExternalIcon className="arq-icon" />
          </a>
        </div>
      </section>

      <section className="arq-section arq-section--articles" aria-labelledby="arq-artigos">
        <div className="arq-inner">
          <div id="arq-artigos">
            <TitleUnderline title={copy.artigos_title} position="center" />
          </div>
          <ul className="arq-articles">
            {articles.map((article) => (
              <li key={article.url}>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="arq-article">
                  <FileLinesIcon className="arq-icon" />
                  <span>{article.title}</span>
                </a>
              </li>
            ))}
          </ul>
          <a href={allArticlesUrl} target="_blank" rel="noopener noreferrer" className="arq-all-link">
            {copy.all_articles_link}
            <ExternalIcon className="arq-icon" />
          </a>
        </div>
      </section>
    </>
  );
}

export default async function ArquivosPage() {
  const locale = await getServerLocale();
  return <ArquivosContent copy={resources[locale].arquivos} />;
}
