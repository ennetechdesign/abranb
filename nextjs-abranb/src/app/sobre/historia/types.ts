import type { resources } from "@/i18n/resources";

export type HistoriaCopy = (typeof resources)["pt-BR"]["historia"];

export type HistoriaSectionProps = {
  id: string;
  key: string;
  copy: HistoriaCopy;
};

export const historiaSectionIds = [
  "hero",
  "o-que-somos",
  "linha-do-tempo",
  "mapa",
] as const;

export type HistoriaSectionId = (typeof historiaSectionIds)[number];
