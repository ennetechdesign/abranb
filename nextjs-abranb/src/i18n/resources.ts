import type { Resource } from "i18next";

import ptBRCommon from "./locales/pt-BR/common.json";
import enCommon from "./locales/en/common.json";

export const resources = {
  "pt-BR": {
    common: ptBRCommon,
  },
  en: {
    common: enCommon,
  },
} satisfies Resource;
