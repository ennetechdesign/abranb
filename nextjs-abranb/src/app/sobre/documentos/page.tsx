import type { Metadata } from "next";

import TitleUnderline from "@/components/title-underline";
import SecondaryHero from "@/components/secondary-hero";
import { DocPill } from "@/components/doc-pill";
import { resources } from "@/i18n/resources";
import { getServerLocale } from "@/lib/resolve-locale";

import "./documentos.css";

type Documentos = (typeof resources)["pt-BR"]["documentos"];

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const { meta_title, meta_description } = resources[locale].documentos;
  return {
    title: meta_title,
    description: meta_description,
  };
}

function DocsContent({ copy }: { copy: Documentos }) {
  const { pareceres, relatorios, outros } = copy.sections;

  return (
    <>
      <SecondaryHero title={copy.hero_title} />

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
  const locale = await getServerLocale();
  const copy = resources[locale].documentos;

  return (
    <main className="min-h-screen w-full">
      <DocsContent copy={copy} />
    </main>
  );
}
