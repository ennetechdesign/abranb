"use client";

import { useTranslation } from "react-i18next";

import { navDrawerSections } from "@/config/nav";

// TODO: Montar as seções da página home
export function HomeSectionPlaceholders() {
  const { t } = useTranslation("common");

  return (
    <div className="mt-16 flex flex-col gap-20 border-t border-border pt-16">
      {navDrawerSections.map((s) => (
        <section
          key={s.sectionId}
          id={s.sectionId}
          className="scroll-mt-24 rounded-lg border border-border bg-surface-elevated/50 p-6"
        >
          <h2 className="text-heading font-bold text-foreground">
            {t(s.labelKey)}
          </h2>
          <p className="text-body mt-2 text-muted-foreground">
            {t("nav_section_placeholder_body")}
          </p>
        </section>
      ))}
    </div>
  );
}
