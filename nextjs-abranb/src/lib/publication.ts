import type { PortableTextBlock } from "next-sanity";

export const WORDS_PER_MINUTE = 200;
const MS_PER_DAY = 86_400_000;

export type RelativeDateLocale = "pt-BR" | "en";

/**
 * Extrai o texto puro de um valor Portable Text, ignorando imagens e
 * outros objetos embutidos.
 */
export function extractPlainText(
  blocks: readonly PortableTextBlock[] | null | undefined,
): string {
  if (!Array.isArray(blocks)) {
    return "";
  }
  return blocks
    .map((block) => {
      const children = (block as unknown as { children?: unknown }).children;
      if (block._type !== "block" || !Array.isArray(children)) {
        return "";
      }
      return children
        .map((child) => {
          const text = (child as { text?: unknown } | null)?.text;
          return typeof text === "string" ? text : "";
        })
        .join("");
    })
    .join("\n");
}

/**
 * Calcula o tempo estimado de leitura em minutos a partir do conteúdo
 * textual. Retorna 0 quando não há texto.
 */
export function estimateReadingTime(
  blocks: readonly PortableTextBlock[] | null | undefined,
  wordsPerMinute: number = WORDS_PER_MINUTE,
): number {
  const words = extractPlainText(blocks)
    .split(/\s+/)
    .filter(Boolean).length;
  if (words === 0) {
    return 0;
  }
  const rate = wordsPerMinute > 0 ? wordsPerMinute : WORDS_PER_MINUTE;
  return Math.max(1, Math.ceil(words / rate));
}

function startOfDayTimestamp(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

/**
 * Descreve a data de publicação de forma relativa ("Hoje", "Ontem",
 * "há 5 dias"). Compara dias de calendário no fuso horário local e nunca
 * apresenta datas futuras como publicações antigas.
 */
export function formatRelativePublishDate(
  publishedAt: string | Date | null | undefined,
  options?: { now?: Date | number; locale?: RelativeDateLocale },
): string {
  const published =
    publishedAt instanceof Date
      ? publishedAt
      : typeof publishedAt === "string" && publishedAt.length > 0
        ? new Date(publishedAt)
        : null;
  if (!published || Number.isNaN(published.getTime())) {
    return "";
  }
  const now =
    options?.now instanceof Date
      ? options.now
      : new Date(options?.now ?? Date.now());
  const locale = options?.locale ?? "pt-BR";
  const diffDays = Math.round(
    (startOfDayTimestamp(now) - startOfDayTimestamp(published)) / MS_PER_DAY,
  );
  if (diffDays < 0) {
    return locale === "en" ? "Scheduled" : "Publicação agendada";
  }
  if (diffDays === 0) {
    return locale === "en" ? "Today" : "Hoje";
  }
  if (diffDays === 1) {
    return locale === "en" ? "Yesterday" : "Ontem";
  }
  return locale === "en" ? `${diffDays} days ago` : `há ${diffDays} dias`;
}

/**
 * Formata a data de publicação de forma absoluta no idioma informado.
 * Com `format: "long"`, inclui dia, mês por extenso e ano.
 */
export function formatPublishDate(
  publishedAt: string | Date | null | undefined,
  locale: RelativeDateLocale = "pt-BR",
  format: "short" | "long" = "short",
): string {
  const published =
    publishedAt instanceof Date ? publishedAt : publishedAt ? new Date(publishedAt) : null;
  if (!published || Number.isNaN(published.getTime())) {
    return "";
  }
  if (format === "long") {
    return published.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return published.toLocaleDateString(locale);
}
