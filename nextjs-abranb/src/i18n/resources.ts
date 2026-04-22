import type { Resource } from "i18next";

import ptBRCommon from "./locales/pt-BR/common.json";
import enCommon from "./locales/en/common.json";
import ptBRHome from "./locales/pt-BR/home.json";
import enHome from "./locales/en/home.json";

export const resources = {
  "pt-BR": {
    common: ptBRCommon,
    home: ptBRHome,
  },
  en: {
    common: enCommon,
    home: enHome,
  },
} satisfies Resource;
