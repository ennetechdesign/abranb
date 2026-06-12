import type { ComponentType } from "react";

import HistoriaHero from "./sections/hero";
import HistoriaIntro from "./sections/intro";
import HistoriaMapa from "./sections/mapa";
import HistoriaTimelineSection from "./sections/timeline";
import {
  historiaSectionIds,
  type HistoriaCopy,
  type HistoriaSectionId,
  type HistoriaSectionProps,
} from "./types";

const sectionComponents: Record<
  HistoriaSectionId,
  ComponentType<HistoriaSectionProps>
> = {
  hero: HistoriaHero,
  "o-que-somos": HistoriaIntro,
  "linha-do-tempo": HistoriaTimelineSection,
  mapa: HistoriaMapa,
};

type HistoriaSectionsProps = {
  copy: HistoriaCopy;
};

export function HistoriaSections({ copy }: HistoriaSectionsProps) {
  return (
    <>
      {historiaSectionIds.map((sectionId) => {
        const SectionComponent = sectionComponents[sectionId];

        return (
          <SectionComponent key={sectionId} id={sectionId} copy={copy} />
        );
      })}
    </>
  );
}
