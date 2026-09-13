"use client";

import { navDrawerSections } from "@/config/nav";
import "./home-sections/home.css";
import EntendaNB from "./home-sections/sections/entenda-nb";
import OQueFizemos from "./home-sections/sections/OQueFizemos";
import NossaHistoria from "./home-sections/sections/nossa-historia";
import Coletives from "./home-sections/sections/coletives";
import SinteseDePautas from "./home-sections/sections/sintese-pautas";
import DocsProduzidos from "./home-sections/sections/docs-produzidos";
import ArquivosHistoricos from "./home-sections/sections/arquivos-historicos";
import AreasTematicas from "./home-sections/sections/areas-tematicas";
import FacaParte from "./home-sections/sections/faca-parte";
import Doacao from "./home-sections/sections/doacao";
import EntreEmContato from "./home-sections/sections/entre-em-contato";

// TODO: Montar as seções da página home
export function HomePageSections() {
  const sectionComponents = {
  "o-que-e-nao-binario": EntendaNB,
  "noticias-abranb": OQueFizemos,
  "nossa-historia": NossaHistoria,
  "nossas-conexoes": Coletives,
  "sintese-pautas": SinteseDePautas,
  "documentos-produzidos": DocsProduzidos,
  "arquivos-historicos": ArquivosHistoricos,
  "areas-tematicas": AreasTematicas,
  "contato": EntreEmContato,
  "faca-parte": FacaParte,
  "doacao": Doacao,
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
