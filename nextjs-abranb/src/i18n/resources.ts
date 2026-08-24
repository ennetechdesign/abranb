import type { Resource } from "i18next";

import ptBRCommon from "./locales/pt-BR/common.json";
import enCommon from "./locales/en/common.json";
import ptBRHome from "./locales/pt-BR/home.json";
import enHome from "./locales/en/home.json";
import ptBRHistoria from "./locales/pt-BR/historia.json";
import enHistoria from "./locales/en/historia.json";
import ptBRPautas from "./locales/pt-BR/pautas.json";
import enPautas from "./locales/en/pautas.json";

export const resources = {
  "pt-BR": {
    common: ptBRCommon,
    home: ptBRHome,
    historia: ptBRHistoria,
    pautas: ptBRPautas,
  },
  en: {
    common: enCommon,
    home: enHome,
    historia: enHistoria,
    pautas: enPautas,
  },
} satisfies Resource;
