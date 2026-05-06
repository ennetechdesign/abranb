"use client";

import { navDrawerSections } from "@/config/nav";
import EntendaNB from "./componentsHome/sections/entenda-nb";

// TODO: Montar as seções da página home
export function HomeSectionPlaceholders() {
  const sectionComponents = {
  "o-que-e-nao-binario": EntendaNB
};

  return (
    <div className="">
      {navDrawerSections.map((s) => {
        const SectionComponent = sectionComponents[s.sectionId as keyof typeof sectionComponents];

        if (!SectionComponent) return null;

        return (
          <section
            key={s.sectionId}
            id={s.sectionId}
            className="bg-surface-elevated/50"
          >
            <SectionComponent />
          </section>
        );
      })}
    </div>
  );
}
