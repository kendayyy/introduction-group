"use server";

import { processContact } from "@/forms/contact";
import { env } from "@/env";

export async function submitContact(formData: FormData) {
  return processContact(
    {
      name: formData.get("name"),
      email: formData.get("email"),
      organization: formData.get("organization"),
      message: formData.get("message"),
      topic: formData.get("topic"),
      companyWebsite: formData.get("companyWebsite"),
      turnstileToken: formData.get("turnstileToken"),
    },
    { secret: env.TURNSTILE_SECRET_KEY },
  );
}
