import type { HistoriaSectionProps } from "../types";

export default function HistoriaIntro({ id, copy }: HistoriaSectionProps) {
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
        <div className="flex w-full flex-col gap-4">
          {copy.body_paragraphs.map((segments, paragraphIndex) => (
            <p
              key={paragraphIndex}
              className="historia-body w-full text-justify text-body"
            >
              {segments.map((seg, i) =>
                seg.type === "emphasis" ? (
                  <strong key={i}>{seg.value}</strong>
                ) : (
                  <span key={i}>{seg.value}</span>
                ),
              )}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
