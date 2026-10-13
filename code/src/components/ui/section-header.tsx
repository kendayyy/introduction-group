import { Stack } from "@/components/ui/stack";

export function SectionHeader({
  id,
  eyebrow,
  title,
  summary,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  summary?: string;
}) {
  return (
    <Stack gap="sm" className="max-w-[47.5rem]">
      {eyebrow ? (
        <p className="text-teal text-sm font-semibold tracking-normal">
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id}>{title}</h2>
      {summary ? <p className="text-muted">{summary}</p> : null}
    </Stack>
  );
}
