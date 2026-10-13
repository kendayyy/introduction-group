"use client";

import { useState } from "react";

export type TabItem = { id: string; label: string; content: string };

export function Tabs({
  items,
  label,
  emptyLabel,
}: {
  items: TabItem[];
  label: string;
  emptyLabel: string;
}) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  if (items.length === 0) {
    return <p>{emptyLabel}</p>;
  }

  return (
    <div>
      <div role="tablist" aria-label={label} className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`${item.id}-tab`}
            aria-selected={active === item.id}
            aria-controls={`${item.id}-panel`}
            tabIndex={active === item.id ? 0 : -1}
            className="border-border aria-selected:bg-ink min-h-11 border px-4 aria-selected:text-white"
            onClick={() => setActive(item.id)}
            onKeyDown={(event) => {
              const horizontal = ["ArrowRight", "ArrowLeft", "Home", "End"];
              if (!horizontal.includes(event.key)) {
                return;
              }
              event.preventDefault();
              const nextIndex =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? items.length - 1
                    : event.key === "ArrowRight"
                      ? (index + 1) % items.length
                      : (index - 1 + items.length) % items.length;
              const next = items[nextIndex];
              setActive(next.id);
              document.getElementById(`${next.id}-tab`)?.focus();
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${item.id}-panel`}
          aria-labelledby={`${item.id}-tab`}
          hidden={active !== item.id}
          className="pt-5"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
