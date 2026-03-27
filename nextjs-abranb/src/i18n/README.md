# Internacionalização (i18n)

Este app usa **react-i18next** com **i18next** e **i18next-browser-languagedetector** apenas para textos da interface. A localização do conteúdo no Sanity ainda não faz parte desta camada.

## Como o idioma é escolhido

1. O **[`src/middleware.ts`](../middleware.ts)** roda primeiro:
   - Se o cookie `NEXT_LOCALE` tiver um valor suportado, ele prevalece (por exemplo, depois de trocar no seletor de idioma).
   - Caso contrário, o padrão é **sempre `pt-BR`** (não usamos `Accept-Language` nem idioma do navegador para definir o idioma inicial).
   - O idioma resolvido é gravado no cookie `NEXT_LOCALE` (para a próxima requisição) e repassado na mesma requisição pelo cabeçalho interno `x-next-locale` (para o layout raiz e o `<html lang>` ficarem corretos já na primeira renderização).

2. O **[`src/app/layout.tsx`](../app/layout.tsx)** lê `x-next-locale` (e, em seguida, o cookie) e passa `locale` para o **`I18nProvider`**.

3. **Componentes cliente** usam `useTranslation('common')` com os recursos JSON em [`locales/`](./locales/).

## Adicionar textos

1. Inclua as chaves em [`locales/pt-BR/common.json`](./locales/pt-BR/common.json) e em [`locales/en/common.json`](./locales/en/common.json).
2. Use `useTranslation('common')` em um componente com **`'use client'`**:

```tsx
"use client";

import { useTranslation } from "react-i18next";

export function Example() {
  const { t } = useTranslation("common");
  return <p>{t("your_key")}</p>;
}
```

## Trocar de idioma

Use o [`LocaleSwitcher`](../components/locale-switcher.tsx) ou chame `i18n.changeLanguage(locale)` junto com [`setLocaleCookie`](../lib/locale-cookie.ts), para o middleware e o HTML gerado no servidor continuarem alinhados.

## Idiomas suportados

Configuração em [`config.ts`](./config.ts): `supportedLocales`, `defaultLocale` (`pt-BR`) e os nomes `NEXT_LOCALE` / `x-next-locale`.
