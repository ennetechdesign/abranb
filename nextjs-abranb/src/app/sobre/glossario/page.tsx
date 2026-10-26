import type { Metadata } from "next";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

import SecondaryHero from "@/components/secondary-hero";
import { resources } from "@/i18n/resources";
import { getServerLocale } from "@/lib/resolve-locale";
import { buildLocaleMetadata } from "@/lib/page-metadata";

import { Blocks, Heading, Panel, Pills, toBlocks, toPanel, toPills } from "./blocks";
import { fontes, images, linguagem as linguagemData, type PhotoData } from "./content";

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

function SourceList({ links }: { links: { label: string; url: string }[] }) {
  return (
    <ul className="gl-sources-col">
      {links.map((link) => (
        <li key={link.url}>
          <a href={link.url} target="_blank" rel="noopener noreferrer" className="gl-source">
            <FontAwesomeIcon icon={faGlobe} aria-hidden className="gl-source-icon" />
            <span>{link.label}</span>
          </a>
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

      <section className="gl-section gl-section--page" aria-labelledby="gl-identidade">
        <div className="gl-inner gl-inner--wide">
          <Heading id="gl-identidade">{identidade.title}</Heading>
          <div className="gl-row">
            <Photo image={images.identidade} className="gl-photo--plain" />
            <div className="gl-prose">
              <Blocks blocks={toBlocks([identidade.lead])} />
            </div>
          </div>
          <div className="gl-prose">
            <Blocks blocks={toBlocks([identidade.follow_up])} />
          </div>
          <div className="gl-inner--panel">
            <Panel panel={toPanel(naoBinarie)} />
          </div>
        </div>
      </section>

      <section className="gl-section gl-section--purple" aria-labelledby="gl-genero-imposto">
        <div className="gl-inner gl-inner--wide">
          <div className="gl-row gl-row--text-first">
            <div className="gl-prose">
              <Heading id="gl-genero-imposto" align="start">{generoImposto.title}</Heading>
              <p>{generoImposto.text}</p>
            </div>
            <Photo image={images.generoImposto} alt={generoImposto.image_alt} className="gl-photo--compact" />
          </div>
        </div>
      </section>

      <section className="gl-section gl-section--page" aria-labelledby="gl-modalidade">
        <div className="gl-inner">
          <Heading id="gl-modalidade">{modalidade.title}</Heading>
          <div className="gl-prose">
            <p>{modalidade.lead}</p>
          </div>
          <div className="gl-inner--panel gl-stack">
            {modalidade.panels.map((panel) => (
              <Panel key={panel.title} panel={toPanel(panel)} />
            ))}
          </div>
        </div>
      </section>

      <section className="gl-section gl-section--yellow" aria-labelledby="gl-expressao">
        <div className="gl-inner gl-inner--wide">
          <div className="gl-row">
            <Photo image={images.expressao} alt={expressao.image_alt} className="gl-photo--square" />
            <div className="gl-prose">
              <Heading id="gl-expressao" align="start">{expressao.title}</Heading>
              {expressao.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="gl-section gl-section--page" aria-labelledby="gl-linguagem">
        <div className="gl-inner gl-inner--wide">
          <Heading id="gl-linguagem" long>{linguagem.title}</Heading>
          <LanguageNote text={linguagem.note} />
          <div className="gl-row gl-row--text-first">
            <div className="gl-prose">
              <Blocks blocks={toBlocks(linguagem.lead)} />
            </div>
            <Photo image={linguagemData.image} alt={linguagem.image_alt} />
          </div>
          <div className="gl-prose">
            <Blocks blocks={toBlocks(linguagem.explanation)} />
          </div>
          <Pills pills={toPills(linguagem.pills)} numbered />
          <figure className="gl-tool">
            <Photo image={linguagemData.tool.image} alt={linguagem.tool_alt} />
            <figcaption>
              <a href={linguagemData.tool.href} target="_blank" rel="noopener noreferrer" className="gl-tool-link">
                {linguagem.tool_label}
              </a>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="gl-section gl-section--purple" aria-labelledby="gl-neolinguagem">
        <div className="gl-inner">
          <Heading id="gl-neolinguagem">{neolinguagem.title}</Heading>
          <LanguageNote text={neolinguagem.note} />
          <div className="gl-prose">
            <p>{neolinguagem.lead}</p>
          </div>
          <Pills pills={toPills(neolinguagem.pills)} />
          <div className="gl-prose">
            <p>{neolinguagem.outro}</p>
          </div>
        </div>
      </section>

      <section className="gl-section gl-section--page" aria-labelledby="gl-transicao">
        <div className="gl-inner">
          <Heading id="gl-transicao">{transicao.title}</Heading>
          <div className="gl-prose">
            <p>{transicao.lead}</p>
          </div>
          <Pills pills={toPills(transicao.pills)} />
          <div className="gl-prose">
            <p>{transicao.outro}</p>
          </div>
        </div>
      </section>

      <section className="gl-section gl-section--yellow" aria-labelledby="gl-intersexo">
        <div className="gl-inner gl-inner--wide">
          <Heading id="gl-intersexo">{intersexo.title}</Heading>
          <div className="gl-row">
            <Photo image={images.intersexo} alt={intersexo.first.image_alt} />
            <div className="gl-prose">
              <Blocks blocks={toBlocks(intersexo.first.blocks)} />
            </div>
          </div>
          <div className="gl-row gl-row--text-first">
            <div className="gl-prose">
              <Blocks blocks={toBlocks(intersexo.second.blocks)} />
            </div>
            <Photo image={images.intersexoFoto} alt={intersexo.second.image_alt} />
          </div>
        </div>
      </section>

      <section className="gl-section gl-section--page" aria-labelledby="gl-cissexismo">
        <div className="gl-inner">
          <Heading id="gl-cissexismo">{cissexismo.title}</Heading>
          <div className="gl-prose">
            <p>{cissexismo.lead}</p>
          </div>
          <Pills pills={toPills(cissexismo.pills)} />
          <div className="gl-inner--panel">
            <Panel panel={toPanel(cissexismo.wide)} />
          </div>
        </div>
      </section>

      <section className="gl-section gl-section--purple" aria-labelledby="gl-nota">
        <div className="gl-inner gl-inner--panel">
          <Heading id="gl-nota">{nota.title}</Heading>
          <div className="gl-prose">
            {nota.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
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
        </div>
      </section>
    </>
  );
}
