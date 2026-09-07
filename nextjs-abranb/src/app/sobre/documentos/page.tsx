import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import Link from "next/link";

import TitleUnderline from "@/components/title-underline";
import { LOCALE_COOKIE, LOCALE_HEADER } from "@/i18n/config";
import { resources } from "@/i18n/resources";
import { normalizeLocale } from "@/lib/resolve-locale";

import "./documentos.css";

type Documentos = (typeof resources)["pt-BR"]["documentos"];
type DocItem = Documentos["sections"]["pareceres"]["docs"][number];

async function getLocale() {
  const headerStore = await headers();
  const cookieStore = await cookies();
  return normalizeLocale(
    headerStore.get(LOCALE_HEADER) ?? cookieStore.get(LOCALE_COOKIE)?.value,
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { meta_title, meta_description } = resources[locale].documentos;
  return {
    title: meta_title,
    description: meta_description,
  };
}

function FileLinesIcon() {
  return (
    <svg
      className="docs-pill-icon"
      viewBox="0 0 384 512"
      fill="currentColor"
      aria-hidden
    >
      <path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM112 256l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
    </svg>
  );
}

function DocPill({ doc }: { doc: DocItem }) {
  const href = doc.href && doc.href !== "#" ? doc.href : "#";
  const isExternal = /^https?:\/\//.test(href);

  return (
    <Link
      href={href}
      className="docs-pill"
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <FileLinesIcon />
      <span className="docs-pill-label">{doc.label}</span>
    </Link>
  );
}

function DocsContent({ copy }: { copy: Documentos }) {
  const { pareceres, relatorios, outros } = copy.sections;

  return (
    <>
      <section
        className="relative flex w-full min-h-[150px] items-center justify-center bg-deep px-4 py-6 sm:min-h-[100px] md:min-h-[150px] md:py-10"
        style={{
          backgroundImage: "url(/secondary-hero.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-deep/35"
          aria-hidden
        />
        <h1 className="relative z-10 text-center text-heading-h1 font-bold text-gold">
          {copy.hero_title}
        </h1>
      </section>

      <section
        className="docs-section docs-section--outer"
        aria-labelledby="docs-pareceres"
      >
        <div className="docs-section-inner">
          <div id="docs-pareceres">
            <TitleUnderline title={pareceres.title} position="center" />
          </div>
          <ul className="docs-list">
            {pareceres.docs.map((doc) => (
              <li key={doc.label}>
                <DocPill doc={doc} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="docs-section docs-section--reports"
        aria-labelledby="docs-relatorios"
      >
        <div className="docs-section-inner">
          <div id="docs-relatorios">
            <TitleUnderline
              title={relatorios.title}
              position="center"
              color="gold"
            />
          </div>
          <ul className="docs-list docs-list--grid">
            {relatorios.docs.map((doc) => (
              <li key={doc.label}>
                <DocPill doc={doc} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="docs-section docs-section--outer"
        aria-labelledby="docs-outros"
      >
        <div className="docs-section-inner">
          <div id="docs-outros">
            <TitleUnderline title={outros.title} position="center" />
          </div>
          <ul className="docs-list">
            {outros.docs.map((doc) => (
              <li key={doc.label}>
                <DocPill doc={doc} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default async function DocumentosPage() {
  const locale = await getLocale();
  const copy = resources[locale].documentos;

  return (
    <main className="min-h-screen w-full">
      <DocsContent copy={copy} />
    </main>
  );
}
