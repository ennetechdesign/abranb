"use client";

import { useState } from "react";

import { brazilMapViewBox, brazilStates } from "./brazil-states";
import type { Collective } from "./data";

type Tip = { name: string; state: string; x: number; y: number };

export default function BrazilMap({
  collectives,
  alt,
}: {
  collectives: Collective[];
  alt: string;
}) {
  const [tip, setTip] = useState<Tip | null>(null);
  const byState = new Map(
    collectives.filter((c) => c.state).map((c) => [c.state as string, c]),
  );

  return (
    <div className="coletivos-map-wrap">
      <svg
        viewBox={brazilMapViewBox}
        role="group"
        aria-label={alt}
        className="coletivos-map"
      >
        <g strokeLinejoin="round">
          {brazilStates.map((state) => {
            const collective = byState.get(state.code);
            if (!collective) {
              return (
                <path
                  key={state.code}
                  d={state.d}
                  className="coletivos-map-state"
                />
              );
            }
            const label = `${state.name}: ${collective.name}`;
            return (
              <a
                key={state.code}
                href={collective.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                onPointerMove={(e) =>
                  setTip({
                    name: collective.name,
                    state: state.name,
                    x: e.clientX,
                    y: e.clientY,
                  })
                }
                onPointerLeave={() => setTip(null)}
                onBlur={() => setTip(null)}
              >
                <path
                  d={state.d}
                  className="coletivos-map-state coletivos-map-state--active"
                />
              </a>
            );
          })}
        </g>
      </svg>

      {tip && (
        <div
          role="tooltip"
          className="coletivos-map-tip"
          style={{ left: tip.x + 12, top: tip.y + 12 }}
        >
          {tip.name}
          <small>{tip.state}</small>
        </div>
      )}
    </div>
  );
}
