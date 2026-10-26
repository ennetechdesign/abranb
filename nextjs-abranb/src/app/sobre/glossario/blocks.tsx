import type { ReactNode } from "react";

/** Locale-file shapes: a string is a paragraph, a string array is a bullet list. */
export type RawBlock = string | string[];
export type RawPill = { title: string; blocks: RawBlock[] };
export type RawPanel = { title: string; intro: RawBlock[]; pills: RawPill[]; outro: RawBlock[] };

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

function Blocks({ blocks }: { blocks: RawBlock[] }) {
  return (
    <>
      {blocks.map((block, i) =>
        typeof block === "string" ? (
          <p key={i}>
            <Rich text={block} />
          </p>
        ) : (
          <ul key={i} className="gl-bullets">
            {block.map((item) => (
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

/** Body copy: a single `text` paragraph and/or `blocks`, plus any extra `children` (e.g. a heading). */
export function Prose({
  text,
  blocks = [],
  children,
}: {
  text?: string;
  blocks?: RawBlock[];
  children?: ReactNode;
}) {
  return (
    <div className="gl-prose">
      {children}
      {text && <Blocks blocks={[text]} />}
      <Blocks blocks={blocks} />
    </div>
  );
}

/** A coloured band of the page. `wide` is for rows that put an image beside text. */
export function Section({
  id,
  tone,
  wide = false,
  children,
}: {
  id: string;
  tone: "page" | "purple" | "yellow";
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={`gl-section gl-section--${tone}`} aria-labelledby={`gl-${id}`}>
      <div className={`gl-inner${wide ? " gl-inner--wide" : ""}`}>{children}</div>
    </section>
  );
}

/** Image and text side by side on desktop, stacked on mobile. */
export function Row({ children }: { children: ReactNode }) {
  return <div className="gl-row">{children}</div>;
}

export function Heading({
  id,
  children,
  align = "center",
  long = false,
}: {
  id: string;
  children: ReactNode;
  align?: "center" | "start";
  long?: boolean;
}) {
  return (
    <h2
      id={`gl-${id}`}
      className={`gl-heading gl-heading--${align}${long ? " gl-heading--long" : ""}`}
    >
      {children}
    </h2>
  );
}

function Pill({ pill, number }: { pill: RawPill; number?: number }) {
  return (
    <li className={`gl-pill${pill.title ? "" : " gl-pill--aside"}`}>
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

export function Pills({ pills, numbered = false }: { pills: RawPill[]; numbered?: boolean }) {
  return (
    <ul className="gl-pills">
      {pills.map((pill, i) => (
        <Pill key={pill.title || i} pill={pill} number={numbered ? i + 1 : undefined} />
      ))}
    </ul>
  );
}

export function Panel({ panel }: { panel: RawPanel }) {
  return (
    <div className="gl-panel">
      <h3 className="gl-panel-title">{panel.title}</h3>
      <Prose blocks={panel.intro} />
      {panel.pills.length > 0 && <Pills pills={panel.pills} />}
      {panel.outro.length > 0 && <Prose blocks={panel.outro} />}
    </div>
  );
}
