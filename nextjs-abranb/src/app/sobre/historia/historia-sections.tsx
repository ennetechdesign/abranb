import HistoriaHero from "./sections/hero";
import HistoriaIntro from "./sections/intro";
import HistoriaTimelineSection from "./sections/timeline";
import {
  historiaSectionIds,
  type HistoriaCopy,
  type HistoriaSectionId,
  type HistoriaSectionProps,
} from "./types";

const sectionComponents: {
  "linha-do-tempo": ({id, copy}: HistoriaSectionProps) => JSX.Element;
  "o-que-somos": ({id, copy}: HistoriaSectionProps) => JSX.Element;
  hero: ({id, copy}: HistoriaSectionProps) => JSX.Element
} = {
  hero: HistoriaHero,
  "o-que-somos": HistoriaIntro,
  "linha-do-tempo": HistoriaTimelineSection,
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
