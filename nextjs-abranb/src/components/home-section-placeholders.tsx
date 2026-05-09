"use client";

import { navDrawerSections } from "@/config/nav";
import "./componentsHome/home.css";
import EntendaNB from "./componentsHome/sections/entenda-nb";
import OQueFizemos from "./componentsHome/sections/OQueFizemos";

// TODO: Montar as seções da página home
export function HomeSectionPlaceholders() {
  const sectionComponents = {
  "o-que-e-nao-binario": EntendaNB,
  "noticias-abranb": OQueFizemos
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
