"use client";

import { navDrawerSections } from "@/config/nav";
import "./home.css";
import EntendaNB from "./sections/entenda-nb";
import OQueFizemos from "./sections/OQueFizemos";
import NossaHistoria from "./sections/nossa-historia";
import Coletives from "./sections/coletives";
import SinteseDePautas from "./sections/sintese-pautas";
import DocsProduzidos from "./sections/docs-produzidos";
import ArquivosHistoricos from "./sections/arquivos-historicos";
import AreasTematicas from "./sections/areas-tematicas";
import FacaParte from "./sections/faca-parte";
import Doacao from "./sections/doacao";
import EntreEmContato from "./sections/entre-em-contato";

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
