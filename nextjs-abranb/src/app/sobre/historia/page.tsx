import type { Metadata } from "next";
import { cookies, headers } from "next/headers";

import { LOCALE_COOKIE, LOCALE_HEADER } from "@/i18n/config";
import { normalizeLocale } from "@/lib/resolve-locale";
import { resources } from "@/i18n/resources";

import "./historia.css";

type BodySegment = { type: "text" | "emphasis"; value: string };

async function getLocale() {
  const headerStore = await headers();
  const cookieStore = await cookies();
  return normalizeLocale(
    headerStore.get(LOCALE_HEADER) ?? cookieStore.get(LOCALE_COOKIE)?.value,
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { meta_title, meta_description } = resources[locale].historia;
  return {
    title: meta_title,
    description: meta_description,
  };
}

export default async function HistoryPage() {
  const locale = await getLocale();
  const copy = resources[locale].historia;
  const segments = copy.body_segments as BodySegment[];

  return (
    <main className="min-h-screen w-full">
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

      <section className="historia-panel px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 md:gap-12">
          <div className="flex flex-col items-center gap-3">
            <h2 className="historia-subheading text-title font-bold">
              {copy.subheading}
            </h2>
            <span className="historia-rule" aria-hidden />
          </div>
          <p className="historia-body w-full text-left text-body">
            {segments.map((seg, i) =>
              seg.type === "emphasis" ? (
                <strong key={i}>{seg.value}</strong>
              ) : (
                <span key={i}>{seg.value}</span>
              ),
            )}
          </p>
        </div>
      </section>
    </main>
  );
}
