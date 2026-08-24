import type { Metadata } from "next";
import { cookies, headers } from "next/headers";

import { LOCALE_COOKIE, LOCALE_HEADER } from "@/i18n/config";
import { resources } from "@/i18n/resources";
import { normalizeLocale } from "@/lib/resolve-locale";

import "./pautas.css";

type Pautas = (typeof resources)["pt-BR"]["pautas"];

async function getLocale() {
  const headerStore = await headers();
  const cookieStore = await cookies();
  return normalizeLocale(
    headerStore.get(LOCALE_HEADER) ?? cookieStore.get(LOCALE_COOKIE)?.value,
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { meta_title, meta_description } = resources[locale].pautas;
  return {
    title: meta_title,
    description: meta_description,
  };
}

function ChevronIcon() {
  return (
    <svg
      className="pauta-pill-chevron"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PautasContent({ pautas }: { pautas: Pautas }) {
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
          {pautas.hero_title}
        </h1>
      </section>

      <section className="pautas-list-section w-full my-6">
        <div className="pautas-list mx-auto flex w-full flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 md:max-w-2xl md:gap-10 md:px-8 md:py-12 lg:max-w-3xl">
          {pautas.topics.map((topic) => (
            <details key={topic.title} className="pauta-item">
              <summary className="pauta-pill">
                <span className="pauta-pill-label">{topic.title}</span>
                <ChevronIcon />
              </summary>
              <div className="pauta-body">
                <ul className="pauta-body-list">
                  {topic.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

export default async function PautasPage() {
  const locale = await getLocale();
  const pautas = resources[locale].pautas;

  return (
    <main className="min-h-screen w-full">
      <PautasContent pautas={pautas} />
    </main>
  );
}
