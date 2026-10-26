import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

import SecondaryHero from "@/components/secondary-hero";
import { resources } from "@/i18n/resources";
import { getServerLocale } from "@/lib/resolve-locale";
import { buildLocaleMetadata } from "@/lib/page-metadata";

import { Heading, Panel, Pills, Prose, Row, Section } from "./blocks";
import {
  fontes,
  images,
  linguagem as linguagemData,
  type PhotoData,
  type SourceLink,
} from "./content";

import "./glossario.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return buildLocaleMetadata(locale, "glossario");
}

function Photo({
  image,
  alt = "",
  className = "",
}: {
  image: PhotoData;
  alt?: string;
  className?: string;
}) {
  return (
    <Image
      src={image.src}
      alt={alt}
      width={image.width}
      height={image.height}
      className={`gl-photo ${className}`.trim()}
    />
  );
}

/** Disclaimer for the language-specific sections; empty in Portuguese. */
function LanguageNote({ text }: { text: string }) {
  return text ? <p className="gl-note">{text}</p> : null;
}

function ExternalLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

function SourceList({ links }: { links: SourceLink[] }) {
  return (
    <ul className="gl-sources-col">
      {links.map((link) => (
        <li key={link.url}>
          <ExternalLink href={link.url} className="gl-source">
            <FontAwesomeIcon icon={faGlobe} aria-hidden className="gl-source-icon" />
            <span>{link.label}</span>
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
}

export default async function GlossarioPage() {
  const locale = await getServerLocale();
  const copy = resources[locale].glossario;
  const {
    identidade,
    nao_binarie: naoBinarie,
    genero_imposto: generoImposto,
    modalidade,
    expressao,
    linguagem,
    neolinguagem,
    transicao,
    intersexo,
    cissexismo,
    nota,
  } = copy;

  return (
    <>
      <SecondaryHero title={copy.hero_title} />

      <Section id="identidade" tone="page" wide>
        <Heading id="identidade">{identidade.title}</Heading>
        <Row>
          <Photo image={images.identidade} className="gl-photo--plain" />
          <Prose text={identidade.lead} />
        </Row>
        <Prose text={identidade.follow_up} />
        <Panel panel={naoBinarie} />
      </Section>

      <Section id="genero-imposto" tone="purple" wide>
        <Row>
          <Prose text={generoImposto.text}>
            <Heading id="genero-imposto" align="start">{generoImposto.title}</Heading>
          </Prose>
          <Photo image={images.generoImposto} alt={generoImposto.image_alt} className="gl-photo--compact" />
        </Row>
      </Section>

      <Section id="modalidade" tone="page">
        <Heading id="modalidade">{modalidade.title}</Heading>
        <Prose text={modalidade.lead} />
        <div className="gl-stack">
          {modalidade.panels.map((panel) => (
            <Panel key={panel.title} panel={panel} />
          ))}
        </div>
      </Section>

      <Section id="expressao" tone="yellow" wide>
        <Row>
          <Photo image={images.expressao} alt={expressao.image_alt} className="gl-photo--square" />
          <Prose blocks={expressao.paragraphs}>
            <Heading id="expressao" align="start">{expressao.title}</Heading>
          </Prose>
        </Row>
      </Section>

      <Section id="linguagem" tone="page" wide>
        <Heading id="linguagem" long>{linguagem.title}</Heading>
        <LanguageNote text={linguagem.note} />
        <Row>
          <Prose blocks={linguagem.lead} />
          <Photo image={linguagemData.image} alt={linguagem.image_alt} />
        </Row>
        <Prose blocks={linguagem.explanation} />
        <Pills pills={linguagem.pills} numbered />
        <figure className="gl-tool">
          <Photo image={linguagemData.tool.image} alt={linguagem.tool_alt} />
          <figcaption>
            <ExternalLink href={linguagemData.tool.href} className="gl-tool-link">
              {linguagem.tool_label}
            </ExternalLink>
          </figcaption>
        </figure>
      </Section>

      <Section id="neolinguagem" tone="purple">
        <Heading id="neolinguagem">{neolinguagem.title}</Heading>
        <LanguageNote text={neolinguagem.note} />
        <Prose text={neolinguagem.lead} />
        <Pills pills={neolinguagem.pills} />
        <Prose text={neolinguagem.outro} />
      </Section>

      <Section id="transicao" tone="page">
        <Heading id="transicao">{transicao.title}</Heading>
        <Prose text={transicao.lead} />
        <Pills pills={transicao.pills} />
        <Prose text={transicao.outro} />
      </Section>

      <Section id="intersexo" tone="yellow" wide>
        <Heading id="intersexo">{intersexo.title}</Heading>
        <Row>
          <Photo image={images.intersexo} alt={intersexo.first.image_alt} />
          <Prose blocks={intersexo.first.blocks} />
        </Row>
        <Row>
          <Prose blocks={intersexo.second.blocks} />
          <Photo image={images.intersexoFoto} alt={intersexo.second.image_alt} />
        </Row>
      </Section>

      <Section id="cissexismo" tone="page">
        <Heading id="cissexismo">{cissexismo.title}</Heading>
        <Prose text={cissexismo.lead} />
        <Pills pills={cissexismo.pills} />
        <Panel panel={cissexismo.wide} />
      </Section>

      <Section id="nota" tone="purple">
        <Heading id="nota">{nota.title}</Heading>
        <Prose blocks={nota.paragraphs} />
        <ul className="gl-resources">
          {nota.resources.map((resource) => (
            <li key={resource.title} className="gl-resource">
              <FontAwesomeIcon icon={faGlobe} aria-hidden className="gl-resource-icon" />
              <div>
                <p className="gl-resource-title">
                  {resource.title}
                  {resource.english && <span className="gl-badge">{nota.english_badge}</span>}
                </p>
                <p className="gl-resource-description">{resource.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="gl-sources-title">{copy.fontes_title}</h2>
        <div className="gl-sources">
          <SourceList links={fontes.left} />
          <SourceList links={fontes.right} />
        </div>
      </Section>
    </>
  );
}
