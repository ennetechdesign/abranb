import SecondaryHero from "@/components/secondary-hero";
import type { HistoriaSectionProps } from "../types";

export default function HistoriaHero({ id, copy }: HistoriaSectionProps) {
  return <SecondaryHero id={id} title={copy.hero_title} />;
}
