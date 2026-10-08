import type { Resource } from "i18next";

import ptBRCommon from "./locales/pt-BR/common.json";
import enCommon from "./locales/en/common.json";
import ptBRHome from "./locales/pt-BR/home.json";
import enHome from "./locales/en/home.json";
import ptBRHistoria from "./locales/pt-BR/historia.json";
import enHistoria from "./locales/en/historia.json";
import ptBRPautas from "./locales/pt-BR/pautas.json";
import enPautas from "./locales/en/pautas.json";
import ptBRDocumentos from "./locales/pt-BR/documentos.json";
import enDocumentos from "./locales/en/documentos.json";

export const resources = {
  "pt-BR": {
    common: ptBRCommon,
    home: ptBRHome,
    historia: ptBRHistoria,
    pautas: ptBRPautas,
    documentos: ptBRDocumentos,
  },
  en: {
    common: enCommon,
    home: enHome,
    historia: enHistoria,
    pautas: enPautas,
    documentos: enDocumentos,
  },
} satisfies Resource;

export type LocaleResource<
  NS extends keyof (typeof resources)["pt-BR"],
> = (typeof resources)["pt-BR"][NS];

type HasMeta = { meta_title: string; meta_description: string };
export type LocaleResourceWithMeta = Extract<
  (typeof resources)["pt-BR"][keyof (typeof resources)["pt-BR"]],
  HasMeta
>;
