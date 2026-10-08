import Image from "next/image";

import type { HistoriaCopy, HistoriaSectionProps } from "../types";

type BodySegment = HistoriaCopy["body_paragraphs"][number][number];

function renderSegments(segments: BodySegment[]) {
  return segments.map((seg, i) =>
    seg.type === "emphasis" ? (
      <strong key={i}>{seg.value}</strong>
    ) : (
      <span key={i}>{seg.value}</span>
    ),
  );
}

export default function HistoriaIntro({ id, copy }: HistoriaSectionProps) {
  const [paragraph1, paragraph2, paragraph3] = copy.body_paragraphs;

  return (
    <section
      id={id}
      className="historia-panel px-8 py-16 md:px-8 md:py-20 md:text-left"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 md:gap-4">
        <div className="flex flex-col items-center gap-3">
          <h2 className="historia-subheading text-title font-bold">
            {copy.subheading}
          </h2>
          <span className="historia-rule" aria-hidden />
        </div>

        <div className="flex w-full flex-col gap-4 md:gap-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <p className="historia-body w-full text-justify text-body md:min-w-0 md:flex-1">
              {renderSegments(paragraph1)}
            </p>
            <Image
              src="/images/membres-abranb.png"
              alt={copy.intro_image_membres_alt}
              width={440}
              height={290}
              sizes="(max-width: 768px) 100vw, 40vw"
              className="h-auto w-full rounded-3xl object-cover md:w-[40%] md:shrink-0"
            />
          </div>

          <div className="flex flex-col gap-4 md:flex-row-reverse md:items-center md:gap-8">
            <p className="historia-body w-full text-justify text-body md:min-w-0 md:flex-1">
              {renderSegments(paragraph2)}
            </p>
            <Image
              src="/images/roda-dialogo.png"
              alt={copy.intro_image_roda_alt}
              width={440}
              height={290}
              sizes="(max-width: 768px) 100vw, 40vw"
              className="h-auto w-full rounded-3xl object-cover md:w-[40%] md:shrink-0"
            />
          </div>

          <p className="historia-body mx-auto md:w-[65%] text-justify text-body">
            {renderSegments(paragraph3)}
          </p>
        </div>
      </div>
    </section>
  );
}
