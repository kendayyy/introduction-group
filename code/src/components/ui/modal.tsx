"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { IconButton } from "@/components/ui/icon-button";

const focusable =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Modal({
  title,
  closeLabel,
  onClose,
  children,
}: {
  title: string;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = "modal-title";

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const root = dialogRef.current;
    const items = () =>
      Array.from(root?.querySelectorAll<HTMLElement>(focusable) ?? []);
    items()[0]?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") {
        return;
      }
      const nodes = items();
      if (nodes.length === 0) {
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [onClose]);

  return (
    <div className="bg-ink/70 fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="bg-background max-h-[90vh] w-full max-w-3xl overflow-y-auto p-5"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id={titleId}>{title}</h2>
          <IconButton label={closeLabel} onClick={onClose}>
            ×
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  );
}
