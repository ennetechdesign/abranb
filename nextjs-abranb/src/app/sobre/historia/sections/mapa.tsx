import type { HistoriaSectionProps } from "../types";

type LegendSegment = { type: "text" | "emphasis"; value: string };

type LegendItem = {
  color: "provimento" | "judicial" | "sem" | "anulado";
  segments: LegendSegment[];
};

function renderLegendSegments(segments: LegendSegment[]) {
  return segments.map((seg, i) =>
    seg.type === "emphasis" ? (
      <strong key={i}>{seg.value}</strong>
    ) : (
      <span key={i}>{seg.value}</span>
    ),
  );
}

export default function HistoriaMapa({ id, copy }: HistoriaSectionProps) {
  const legendItems = copy.mapa_legend as LegendItem[];

  return (
    <section
      id={id}
      className="historia-panel px-8 py-16 md:py-20"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 lg:gap-12">
        <div className="flex flex-col items-center gap-3">
          <h2 className="historia-subheading text-title text-center font-bold">
            {copy.mapa_title}
          </h2>
          <span className="historia-rule" aria-hidden />
        </div>

        <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-12">
          <img
            src="/mapa-reconhecimento.svg"
            alt={copy.mapa_alt}
            width={329}
            height={300}
            className="historia-mapa-image w-full max-w-md shrink-0 lg:max-w-lg"
          />

          <ul className="historia-mapa-legend flex flex-col gap-4 lg:gap-5">
            {legendItems.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-body"
              >
                <span
                  className={`historia-mapa-legend-dot historia-mapa-legend-dot--${item.color} mt-1 shrink-0`}
                  aria-hidden
                />
                <span className="min-w-0">
                  {renderLegendSegments(item.segments)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
