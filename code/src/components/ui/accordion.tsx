"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
};

export function Accordion({
  items,
  emptyLabel,
}: {
  items: AccordionItem[];
  emptyLabel: string;
}) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  if (items.length === 0) {
    return <p>{emptyLabel}</p>;
  }

  return (
    <div className="border-border border-y">
      {items.map((item, index) => {
        const open = openId === item.id;
        return (
          <div key={item.id} className="border-border border-b last:border-b-0">
            <h3>
              <button
                type="button"
                className="flex min-h-11 w-full items-center justify-between py-3 text-left font-semibold"
                aria-expanded={open}
                aria-controls={`${item.id}-panel`}
                id={`${item.id}-button`}
                onClick={() => setOpenId(open ? null : item.id)}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
                    return;
                  }
                  event.preventDefault();
                  const next =
                    event.key === "ArrowDown"
                      ? items[(index + 1) % items.length]
                      : items[(index - 1 + items.length) % items.length];
                  document.getElementById(`${next.id}-button`)?.focus();
                }}
              >
                {item.title}
                <span aria-hidden="true">{open ? "–" : "+"}</span>
              </button>
            </h3>
            <div
              id={`${item.id}-panel`}
              role="region"
              aria-labelledby={`${item.id}-button`}
              hidden={!open}
              className={cn("text-muted pb-4", open && "block")}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
