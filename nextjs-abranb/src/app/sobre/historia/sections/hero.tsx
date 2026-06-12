import type { HistoriaSectionProps } from "../types";

export default function HistoriaHero({ id, copy }: HistoriaSectionProps) {
  return (
    <section
      id={id}
      className="relative flex w-full min-h-[150px] items-center justify-center bg-deep px-4 py-6 sm:min-h-[100px] md:min-h-[150px] md:py-10"
      style={{
        backgroundImage: "url(/secondary-hero.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-deep/35"
        aria-hidden
      />
      <h1 className="relative z-10 text-center text-heading-h1 font-bold text-gold">
        {copy.hero_title}
      </h1>
    </section>
  );
}
