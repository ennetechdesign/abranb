import type { Metadata } from "next";
import Link from "next/link";

import SecondaryHero from "@/components/secondary-hero";
import { resources } from "@/i18n/resources";
import { getServerLocale } from "@/lib/resolve-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const copy = resources[locale].common;
  return {
    title: copy.nav_sobre_partners,
    description: copy.about_meta_description,
  };
}

export default async function ColetivosPage() {
  const locale = await getServerLocale();
  const copy = resources[locale].common;

  return (
    <>
      <SecondaryHero title={copy.nav_sobre_partners} />
      <section className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-body text-foreground">{copy.about_lead}</p>
        <p className="mt-6">
          <Link href="/" className="text-link hover:underline">
            {copy.about_back_home}
          </Link>
        </p>
      </section>
    </>
  );
}
