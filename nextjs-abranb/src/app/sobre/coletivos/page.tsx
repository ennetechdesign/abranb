import type { Metadata } from "next";
import Image from "next/image";

import { resources, type LocaleResource } from "@/i18n/resources";
import { getServerLocale } from "@/lib/resolve-locale";
import { buildLocaleMetadata } from "@/lib/page-metadata";
import SecondaryHero from "@/components/secondary-hero";

import BrazilMap from "./brazil-map";
import { localCollectives, nationalCollectives, type Collective } from "./data";

import "./coletivos.css";

type Coletivos = LocaleResource<"coletivos">;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return buildLocaleMetadata(locale, "coletivos");
}

function CollectivePills({
  collectives,
  folder,
}: {
  collectives: Collective[];
  folder: "locais" | "nacionais";
}) {
  return (
    <ul className="coletivos-pills">
      {collectives.map((collective) => (
        <li key={collective.name}>
          <a
            href={collective.url}
            target="_blank"
            rel="noopener noreferrer"
            className="coletivos-pill"
          >
            <Image
              src={`/images/coletives/${folder}/${collective.logo}`}
              alt=""
              width={120}
              height={120}
              className="coletivos-pill-logo"
            />
            <span className="coletivos-pill-name">{collective.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function ColetivosContent({ copy }: { copy: Coletivos }) {
  return (
    <>
      <SecondaryHero title={copy.hero_title} />

      <section className="coletivos-locais px-4 py-12 md:py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 lg:gap-10">
          <div className="flex flex-col items-center gap-3">
            <h2 className="coletivos-heading text-display text-center font-bold">
              {copy.locais_title}
            </h2>
            <span className="coletivos-rule" aria-hidden />
          </div>

          <p className="coletivos-hint text-caption text-center">
            {copy.map_hint}
          </p>

          <div className="flex w-full flex-col items-center gap-8 md:flex-row md:justify-center md:gap-12">
            <BrazilMap collectives={localCollectives} alt={copy.map_alt} />
            <ul className="coletivos-legend flex flex-col gap-4 text-body">
              <li className="flex items-start gap-3">
                <span className="coletivos-legend-dot coletivos-legend-dot--with" aria-hidden />
                {copy.map_legend_with}
              </li>
              <li className="flex items-start gap-3">
                <span className="coletivos-legend-dot coletivos-legend-dot--without" aria-hidden />
                {copy.map_legend_without}
              </li>
            </ul>
          </div>

          <CollectivePills collectives={localCollectives} folder="locais" />
        </div>
      </section>

      <section className="coletivos-nacionais px-4 py-12 md:py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 lg:gap-10">
          <div className="flex flex-col items-center gap-3">
            <h2 className="coletivos-heading text-display text-center font-bold">
              {copy.nacionais_title}
            </h2>
            <span className="coletivos-rule" aria-hidden />
          </div>

          <CollectivePills collectives={nationalCollectives} folder="nacionais" />
        </div>
      </section>
    </>
  );
}

export default async function ColetivosPage() {
  const locale = await getServerLocale();
  return <ColetivosContent copy={resources[locale].coletivos} />;
}
