import type { Metadata } from "next";

import { getServerLocale } from "@/lib/resolve-locale";
import { resources } from "@/i18n/resources";

import { HistoriaSections } from "./historia-sections";

import "./historia.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const { meta_title, meta_description } = resources[locale].historia;
  return {
    title: meta_title,
    description: meta_description,
  };
}

export default async function HistoryPage() {
  const locale = await getServerLocale();
  const copy = resources[locale].historia;

  return (
    <main className="min-h-screen w-full">
      <HistoriaSections copy={copy} />
    </main>
  );
}
