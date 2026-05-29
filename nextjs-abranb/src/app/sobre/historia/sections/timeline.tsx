import {
  HistoriaTimeline,
  type HistoriaTimelineEntry,
} from "@/components/historia-timeline";

import type { HistoriaSectionProps } from "../types";

export default function HistoriaTimelineSection({ id, copy }: HistoriaSectionProps) {
  const timelineEntries = copy.timeline_entries as HistoriaTimelineEntry[];

  return (
    <HistoriaTimeline
      id={id}
      title={copy.timeline_title}
      entries={timelineEntries}
    />
  );
}
