import { z } from "zod";

export const contactTopics = [
  "general",
  "customer",
  "partner",
  "media",
  "career",
  "investor",
] as const;

const contactSchema = z.object({
  name: z.string().trim().min(1),
  email: z.email(),
  organization: z.string().trim().min(1),
  message: z.string().trim().min(1),
  topic: z.enum(contactTopics),
  companyWebsite: z.string().optional(),
  turnstileToken: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactResult =
  | { status: "sent" }
  | { status: "invalid"; fieldErrors: Record<string, string> }
  | { status: "rejected" }
  | { status: "unavailable" };

export function validateContact(input: unknown) {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= key === "email" ? "email" : "required";
    }
    return { success: false as const, fieldErrors };
  }
  return { success: true as const, data: parsed.data };
}

export async function processContact(
  input: unknown,
  options: {
    secret: string | undefined;
    fetcher?: typeof fetch;
  },
): Promise<ContactResult> {
  const validated = validateContact(input);
  if (!validated.success) {
    return { status: "invalid", fieldErrors: validated.fieldErrors };
  }

  if (validated.data.companyWebsite) {
    return { status: "rejected" };
  }

  if (!options.secret) {
    return { status: "unavailable" };
  }

  if (!validated.data.turnstileToken) {
    return { status: "rejected" };
  }

  const fetcher = options.fetcher ?? fetch;
  const response = await fetcher(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: options.secret,
        response: validated.data.turnstileToken,
      }),
    },
  );

  if (!response.ok) {
    return { status: "rejected" };
  }

  const payload = (await response.json()) as { success?: boolean };
  return payload.success ? { status: "sent" } : { status: "rejected" };
}
