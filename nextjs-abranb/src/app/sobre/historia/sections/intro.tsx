import type { HistoriaSectionProps } from "../types";

type BodySegment = { type: "text" | "emphasis"; value: string };

export default function HistoriaIntro({ id, copy }: HistoriaSectionProps) {
  const segments = copy.body_segments as BodySegment[];

  return (
    <section
      id={id}
      className="historia-panel px-8 py-16 md:px-8 md:py-20 md:text-left"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 md:gap-4">
        <div className="flex flex-col items-center gap-3">
          <h2 className="historia-subheading text-title font-bold">
            {copy.subheading}
          </h2>
          <span className="historia-rule" aria-hidden />
        </div>
        <p className="historia-body w-full text-left md:text-left text-body">
          {segments.map((seg, i) =>
            seg.type === "emphasis" ? (
              <strong key={i}>{seg.value}</strong>
            ) : (
              <span key={i}>{seg.value}</span>
            ),
          )}
        </p>
      </div>
    </section>
  );
}
