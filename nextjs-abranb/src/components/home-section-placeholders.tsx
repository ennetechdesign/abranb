"use client";

import { navDrawerSections } from "@/config/nav";
import "./componentsHome/home.css";
import EntendaNB from "./componentsHome/sections/entenda-nb";
import OQueFizemos from "./componentsHome/sections/OQueFizemos";
import NossaHistoria from "./componentsHome/sections/nossa-historia";
import Coletives from "./componentsHome/sections/coletives";
import SinteseDePautas from "./componentsHome/sections/sintese-pautas";

// TODO: Montar as seções da página home
export function HomeSectionPlaceholders() {
  const sectionComponents = {
  "o-que-e-nao-binario": EntendaNB,
  "noticias-abranb": OQueFizemos,
  "nossa-historia": NossaHistoria,
  "nossas-conexoes": Coletives,
  "sintese-pautas": SinteseDePautas
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
