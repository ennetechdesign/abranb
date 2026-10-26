import type { ReactNode } from "react";

import type { Block, PanelData, PillData } from "./content";

/** Locale-file shapes: a string is a paragraph, a string array is a bullet list. */
export type RawBlock = string | string[];
export type RawPill = { title: string; blocks: RawBlock[] };
export type RawPanel = { title: string; intro: RawBlock[]; pills: RawPill[]; outro: RawBlock[] };

export const toBlocks = (raw: RawBlock[]): Block[] =>
  raw.map((b) => (typeof b === "string" ? { kind: "p", text: b } : { kind: "ul", items: b }));

/** A pill without a title is the centred "aside" pill. */
export const toPills = (raw: RawPill[]): PillData[] =>
  raw.map((pill) => ({
    title: pill.title || undefined,
    blocks: toBlocks(pill.blocks),
    aside: !pill.title,
  }));

export const toPanel = (raw: RawPanel): PanelData => ({
  title: raw.title,
  intro: toBlocks(raw.intro),
  pills: raw.pills.length ? toPills(raw.pills) : undefined,
  outro: raw.outro.length ? toBlocks(raw.outro) : undefined,
});

const LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

/** Splits plain text on `*` / `**` / `***` markers, tracking italic and bold state. */
function renderEmphasis(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let bold = false;
  let italic = false;
  let buffer = "";
  const flush = () => {
    if (!buffer) return;
    let node: ReactNode = buffer;
    if (italic) node = <em>{node}</em>;
    if (bold) node = <strong className="gl-em">{node}</strong>;
    nodes.push(<span key={`${keyPrefix}-${nodes.length}`}>{node}</span>);
    buffer = "";
  };
  for (let i = 0; i < text.length; ) {
    if (text[i] !== "*") {
      buffer += text[i++];
      continue;
    }
    const run = text.startsWith("***", i) ? 3 : text.startsWith("**", i) ? 2 : 1;
    flush();
    if (run >= 2) bold = !bold;
    if (run !== 2) italic = !italic;
    i += run;
  }
  flush();
  return nodes;
}

/**
 * Renders the light markup used in the locale files: `**highlight**`, `*italic*`
 * (they can nest, e.g. `***both**` closes with `*`) and `[label](https://link)`.
 */
export function Rich({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    nodes.push(...renderEmphasis(text.slice(last, match.index), `t${nodes.length}`));
    nodes.push(
      <a
        key={`l${nodes.length}`}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="gl-link"
      >
        {renderEmphasis(match[1], `a${nodes.length}`)}
      </a>,
    );
    last = match.index + match[0].length;
  }
  nodes.push(...renderEmphasis(text.slice(last), `t${nodes.length}`));
  return <>{nodes}</>;
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) =>
        block.kind === "p" ? (
          <p key={i}>
            <Rich text={block.text} />
          </p>
        ) : (
          <ul key={i} className="gl-bullets">
            {block.items.map((item) => (
              <li key={item}>
                <Rich text={item} />
              </li>
            ))}
          </ul>
        ),
      )}
    </>
  );
}

export function Heading({
  id,
  children,
  align = "center",
  long = false,
}: {
  id?: string;
  children: ReactNode;
  align?: "center" | "start";
  long?: boolean;
}) {
  return (
    <h2
      id={id}
      className={`gl-heading gl-heading--${align}${long ? " gl-heading--long" : ""}`}
    >
      {children}
    </h2>
  );
}

export function Pill({ pill, number }: { pill: PillData; number?: number }) {
  return (
    <li className={`gl-pill${pill.aside ? " gl-pill--aside" : ""}`}>
      {pill.title && (
        <div className="gl-pill-head">
          {number !== undefined && (
            <span className="gl-pill-number" aria-hidden>
              {number}
            </span>
          )}
          <strong className="gl-pill-title">{pill.title}</strong>
        </div>
      )}
      <div className="gl-pill-body">
        <Blocks blocks={pill.blocks} />
      </div>
    </li>
  );
}

export function Pills({
  pills,
  numbered = false,
}: {
  pills: PillData[];
  numbered?: boolean;
}) {
  return (
    <ul className="gl-pills">
      {pills.map((pill, i) => (
        <Pill key={pill.title ?? i} pill={pill} number={numbered ? i + 1 : undefined} />
      ))}
    </ul>
  );
}

export function Panel({ panel }: { panel: PanelData }) {
  return (
    <div className="gl-panel">
      <h3 className="gl-panel-title">{panel.title}</h3>
      <div className="gl-prose">
        <Blocks blocks={panel.intro} />
      </div>
      {panel.pills && <Pills pills={panel.pills} />}
      {panel.outro && (
        <div className="gl-prose">
          <Blocks blocks={panel.outro} />
        </div>
      )}
    </div>
  );
}
