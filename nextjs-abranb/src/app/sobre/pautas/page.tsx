import type { Metadata } from "next";

import { resources, type LocaleResource } from "@/i18n/resources";
import { getServerLocale } from "@/lib/resolve-locale";
import { buildLocaleMetadata } from "@/lib/page-metadata";
import SecondaryHero from "@/components/secondary-hero";
import { ChevronIcon } from "@/components/chevron-icon";

import "./pautas.css";

type Pautas = LocaleResource<"pautas">;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return buildLocaleMetadata(locale, "pautas");
}

function PautasContent({ pautas }: { pautas: Pautas }) {
  return (
    <>
      <SecondaryHero title={pautas.hero_title} />

      <section className="pautas-list-section w-full my-6">
        <div className="pautas-list mx-auto flex w-full flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 md:max-w-2xl md:gap-10 md:px-8 md:py-12 lg:max-w-3xl">
          {pautas.topics.map((topic) => (
            <details key={topic.title} className="pauta-item">
              <summary className="pauta-pill" style={{ listStyle: "none" }}>
                <span className="pauta-pill-label">{topic.title}</span>
                <ChevronIcon className="pauta-pill-chevron" size={24} />
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
  const locale = await getServerLocale();
  const pautas = resources[locale].pautas;

  return <PautasContent pautas={pautas} />;
}
