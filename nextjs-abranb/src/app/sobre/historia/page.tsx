import type { Metadata } from "next";
import { cookies, headers } from "next/headers";

import { LOCALE_COOKIE, LOCALE_HEADER } from "@/i18n/config";
import { normalizeLocale } from "@/lib/resolve-locale";
import { resources } from "@/i18n/resources";

import { HistoriaSections } from "./historia-sections";

import "./historia.css";

async function getLocale() {
  const headerStore = await headers();
  const cookieStore = await cookies();
  return normalizeLocale(
    headerStore.get(LOCALE_HEADER) ?? cookieStore.get(LOCALE_COOKIE)?.value,
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { meta_title, meta_description } = resources[locale].historia;
  return {
    title: meta_title,
    description: meta_description,
  };
}

export default async function HistoryPage() {
  const locale = await getLocale();
  const copy = resources[locale].historia;

  return (
    <main className="min-h-screen w-full">
      <HistoriaSections copy={copy} />
    </main>
  );
}
