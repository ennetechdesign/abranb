export type HistoriaTimelineBodySegment =
  | { type: "text"; value: string }
  | { type: "emphasis"; value: string };

export type HistoriaTimelineEntry = {
  year: string;
  side: "left" | "right";
  body_segments: HistoriaTimelineBodySegment[];
};

type HistoriaTimelineProps = {
  id?: string;
  title: string;
  entries: HistoriaTimelineEntry[];
};

function renderBodySegments(segments: HistoriaTimelineBodySegment[]) {
  return segments.map((seg, i) =>
    seg.type === "emphasis" ? (
      <strong key={i}>{seg.value}</strong>
    ) : (
      <span key={i}>{seg.value}</span>
    ),
  );
}

/** Desktop: grid 1fr / auto / 1fr so the middle column is geometrically centered on the spine (50%). */
const rowLayout =
  "flex flex-col items-center gap-4 pb-10 last:pb-8 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-x-0 md:pb-14 md:last:pb-10";

const yearCell =
  "historia-timeline-year order-1 shrink-0 md:order-none md:col-start-2 md:row-start-1 md:justify-self-center md:z-[2]";

export function HistoriaTimeline({ id, title, entries }: HistoriaTimelineProps) {
  const headingId = "historia-timeline-heading";

  return (
    <section
      id={id}
      className="historia-timeline"
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="historia-timeline-heading">
        {title}
        <span className="historia-timeline-heading-rule" aria-hidden />
      </h2>

      <div className="historia-timeline-track">
        <div className="historia-timeline-spine" aria-hidden />
        <ol className="historia-timeline-list">
          {entries.map((entry, index) => (
            <li
              key={`${entry.year}-${entry.side}-${index}`}
              className={rowLayout}
            >
              {entry.side === "left" ? (
                <>
                  <span className={yearCell}>{entry.year}</span>
                  <div className="order-2 flex w-full max-w-lg flex-col items-center md:order-none md:col-start-1 md:row-start-1 md:flex md:w-auto md:max-w-none md:min-w-0 md:flex-row md:items-center md:justify-end md:gap-0">
                    <article className="historia-timeline-card w-full md:w-auto md:max-w-[min(100%,20rem)]">
                      <p className="m-0">
                        {renderBodySegments(entry.body_segments)}
                      </p>
                    </article>
                    <span
                      className="historia-timeline-connector hidden shrink-0 md:block"
                      aria-hidden
                    />
                  </div>
                </>
              ) : (
                <>
                  <span className={yearCell}>{entry.year}</span>
                  <div className="order-2 flex w-full max-w-lg flex-col items-center md:order-none md:col-start-3 md:row-start-1 md:flex md:w-auto md:max-w-none md:min-w-0 md:flex-row md:items-center md:justify-start md:gap-0">
                    <span
                      className="historia-timeline-connector hidden shrink-0 md:block"
                      aria-hidden
                    />
                    <article className="historia-timeline-card w-full md:w-auto md:max-w-[min(100%,20rem)]">
                      <p className="m-0">
                        {renderBodySegments(entry.body_segments)}
                      </p>
                    </article>
                  </div>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
