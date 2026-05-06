"use client";

import { navDrawerSections } from "@/config/nav";
import EntendaNB from "./componentsHome/sections/entenda-nb";

// TODO: Montar as seções da página home
export function HomeSectionPlaceholders() {
  const sectionComponents = {
  "o-que-e-nao-binario": EntendaNB
};

  return (
    <div className="mt-16 flex flex-col gap-20 border-t border-border pt-16">
      {navDrawerSections.map((s) => {
        const SectionComponent = sectionComponents[s.sectionId as keyof typeof sectionComponents];

        if (!SectionComponent) return null;

        return (
          <section
            key={s.sectionId}
            id={s.sectionId}
            className="scroll-mt-24 rounded-lg border border-border bg-surface-elevated/50 p-6"
          >
            <SectionComponent />
          </section>
        );
      })}
    </div>
  );
}
