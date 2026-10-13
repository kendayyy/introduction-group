import type { TimelineEvent } from "@/content/map";
import type { Dictionary } from "@/i18n/dictionary";

export function Timeline({
  events,
  dictionary,
}: {
  events: TimelineEvent[];
  dictionary: Dictionary;
}) {
  if (events.length === 0) {
    return <p>{dictionary.emptyRecords}</p>;
  }

  return (
    <ol className="grid gap-6 lg:auto-cols-fr lg:grid-flow-col lg:overflow-x-auto">
      {events.map((event) => (
        <li
          key={event.id}
          className="border-teal border-s ps-4 lg:border-s-0 lg:border-t lg:ps-0 lg:pt-4"
        >
          <p className="text-teal text-sm">{event.dateLabel}</p>
          <h3 className="mt-2">{event.title}</h3>
          <p className="text-muted mt-2">{event.description}</p>
          <p className="mt-2 text-sm">
            {dictionary.source}: {event.source}
          </p>
        </li>
      ))}
    </ol>
  );
}
