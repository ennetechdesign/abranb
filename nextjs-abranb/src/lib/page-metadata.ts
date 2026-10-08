import type { Metadata } from "next";
import { resources, type LocaleResourceWithMeta } from "@/i18n/resources";
import type { AppLocale } from "@/i18n/config";

export function buildLocaleMetadata(
  locale: AppLocale,
  namespace: "historia" | "pautas" | "documentos",
): Metadata {
  const meta = resources[locale][namespace] as LocaleResourceWithMeta;
  return {
    title: meta.meta_title,
    description: meta.meta_description,
  };
}
