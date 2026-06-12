import type { HistoriaSectionProps } from "../types";

export default function HistoriaPrincipios({ id, copy }: HistoriaSectionProps) {
  const items = copy.principios_items as string[];

  return (
    <section
      id={id}
      className="historia-panel px-8 py-16 md:py-20"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 md:gap-10">
        <div className="flex flex-col items-center gap-3">
          <h2 className="historia-subheading text-title text-center font-bold">
            {copy.principios_title}
          </h2>
          <span className="historia-rule" aria-hidden />
        </div>

        <ul className="historia-principios-list w-full">
          {items.map((text, index) => (
            <li
              key={index}
              className={`historia-principios-item ${
                index % 2 === 0
                  ? "historia-principios-item--left"
                  : "historia-principios-item--right"
              }`}
            >
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
