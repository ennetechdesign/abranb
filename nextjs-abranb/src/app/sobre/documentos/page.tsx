import type { Metadata } from "next";

import TitleUnderline from "@/components/title-underline";
import SecondaryHero from "@/components/secondary-hero";
import Button, { FileLinesIcon } from "@/components/button";
import { resources, type LocaleResource } from "@/i18n/resources";
import { getServerLocale } from "@/lib/resolve-locale";
import { buildLocaleMetadata } from "@/lib/page-metadata";

import "./documentos.css";

type Documentos = LocaleResource<"documentos">;
type DocItem = Documentos["sections"]["pareceres"]["docs"][number];

function DocPill({
  doc,
  variant,
}: {
  doc: DocItem;
  variant: "docs-outer" | "docs-reports";
}) {
  const href = doc.href && doc.href !== "#" ? doc.href : "#";
  return (
    <Button variant={variant} href={href} icon={<FileLinesIcon className="docs-pill-icon" />}>
      {doc.label}
    </Button>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return buildLocaleMetadata(locale, "documentos");
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
                <DocPill doc={doc} variant="docs-outer" />
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
                <DocPill doc={doc} variant="docs-reports" />
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
                <DocPill doc={doc} variant="docs-outer" />
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

  return <DocsContent copy={copy} />;
}
