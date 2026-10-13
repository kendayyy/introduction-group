import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { HomePage } from "@/components/home/home-page";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Tabs } from "@/components/ui/tabs";
import { mapSite } from "@/content/map";
import { localRawSite } from "@/content/mock";
import { getDictionary } from "@/i18n/dictionary";

const content = mapSite(localRawSite)!;
const dictionary = getDictionary("vi");

afterEach(() => {
  cleanup();
});

describe("home page", () => {
  it("renders the Web2Go heading and sourced metrics", () => {
    render(<HomePage content={content} dictionary={dictionary} locale="vi" />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Hệ thống số cho vận hành thực tế",
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: dictionary.metrics }),
    ).toBeTruthy();
    expect(
      screen.getByText("9 cổng đã bàn giao", { exact: false }),
    ).toBeTruthy();
    expect(
      screen.getByRole("region", { name: dictionary.sectors }),
    ).toBeTruthy();
  });

  it("links every ecosystem company, including the mobile accordion", () => {
    render(<HomePage content={content} dictionary={dictionary} locale="vi" />);
    const hrefs = screen
      .getAllByRole("link", { hidden: true })
      .map((link) => link.getAttribute("href"));

    for (const company of content.subsidiaries) {
      expect(hrefs).toContain(`/vi/ecosystem/${company.slug}`);
    }
  });
});

describe("primitives", () => {
  it("exposes disabled and loading button states", () => {
    render(
      <Button type="button" disabled loading>
        Save
      </Button>,
    );
    expect(
      (screen.getByRole("button", { name: "Save" }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
  });

  it("moves accordion focus with the arrow keys", () => {
    render(
      <Accordion
        emptyLabel="Empty"
        items={[
          { id: "one", title: "One", content: "First" },
          { id: "two", title: "Two", content: "Second" },
        ]}
      />,
    );
    const first = screen.getByRole("button", { name: /One/ });
    first.focus();
    fireEvent.keyDown(first, { key: "ArrowDown" });
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: /Two/ }),
    );
  });

  it("selects tabs from the keyboard", () => {
    render(
      <Tabs
        label="Topics"
        emptyLabel="Empty"
        items={[
          { id: "one", label: "One", content: "First" },
          { id: "two", label: "Two", content: "Second" },
        ]}
      />,
    );
    const first = screen.getByRole("tab", { name: "One" });
    first.focus();
    fireEvent.keyDown(first, { key: "ArrowRight" });
    expect(document.activeElement).toBe(
      screen.getByRole("tab", { name: "Two" }),
    );
    expect(screen.getByRole("tabpanel").textContent).toContain("Second");
  });

  it("returns focus when a modal closes", () => {
    function Harness() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open
          </button>
          {open ? (
            <Modal
              title="Dialog"
              closeLabel="Close dialog"
              onClose={() => setOpen(false)}
            >
              <p>Body</p>
            </Modal>
          ) : null}
        </>
      );
    }

    render(<Harness />);
    const open = screen.getByRole("button", { name: "Open" });
    open.focus();
    fireEvent.click(open);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Open" }),
    );
  });
});
