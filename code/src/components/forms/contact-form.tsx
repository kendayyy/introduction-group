"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { contactTopics, type ContactResult } from "@/forms/contact";
import type { Dictionary } from "@/i18n/dictionary";

export function ContactForm({
  dictionary,
  siteKey,
  topic,
  action,
}: {
  dictionary: Dictionary;
  siteKey?: string;
  topic?: string;
  action: (formData: FormData) => Promise<ContactResult>;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<ContactResult["status"] | null>(null);
  const [loading, setLoading] = useState(false);
  const initialTopic =
    contactTopics.find((item) => item === topic) ?? "general";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextErrors: Record<string, string> = {};
    if (!String(form.get("name") ?? "").trim())
      nextErrors.name = dictionary.formRequired;
    if (!String(form.get("email") ?? "").includes("@")) {
      nextErrors.email = dictionary.formEmailInvalid;
    }
    if (!String(form.get("organization") ?? "").trim()) {
      nextErrors.organization = dictionary.formRequired;
    }
    if (!String(form.get("message") ?? "").trim()) {
      nextErrors.message = dictionary.formRequired;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setLoading(true);
    const result = await action(form);
    setStatus(result.status);
    if (result.status === "invalid") {
      setErrors(
        Object.fromEntries(
          Object.keys(result.fieldErrors).map((key) => [
            key,
            dictionary.formRequired,
          ]),
        ),
      );
    }
    setLoading(false);
  }

  return (
    <form className="grid max-w-xl gap-4" onSubmit={onSubmit} noValidate>
      <label className="grid gap-2">
        {dictionary.formName}
        <input
          className="border-border min-h-11 border px-3"
          name="name"
          autoComplete="name"
        />
        {errors.name ? <span role="alert">{errors.name}</span> : null}
      </label>
      <label className="grid gap-2">
        {dictionary.formEmail}
        <input
          className="border-border min-h-11 border px-3"
          name="email"
          type="email"
          autoComplete="email"
        />
        {errors.email ? <span role="alert">{errors.email}</span> : null}
      </label>
      <label className="grid gap-2">
        {dictionary.formOrganization}
        <input
          className="border-border min-h-11 border px-3"
          name="organization"
        />
        {errors.organization ? (
          <span role="alert">{errors.organization}</span>
        ) : null}
      </label>
      <label className="grid gap-2">
        {dictionary.formTopic}
        <select
          className="border-border min-h-11 border px-3"
          name="topic"
          defaultValue={initialTopic}
        >
          {contactTopics.map((item) => (
            <option key={item} value={item}>
              {dictionary.topics[item]}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2">
        {dictionary.formMessage}
        <textarea
          className="border-border min-h-32 border px-3 py-2"
          name="message"
        />
        {errors.message ? <span role="alert">{errors.message}</span> : null}
      </label>
      <label className="absolute left-[-999px] h-px w-px overflow-hidden">
        Website
        <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </label>
      <input type="hidden" name="turnstileToken" value={siteKey ? "" : ""} />
      <Button type="submit" loading={loading}>
        {loading ? dictionary.formSending : dictionary.formSubmit}
      </Button>
      {status === "sent" ? <p role="status">{dictionary.formSent}</p> : null}
      {status === "rejected" ? (
        <p role="alert">{dictionary.formRejected}</p>
      ) : null}
      {status === "unavailable" ? (
        <p role="alert">{dictionary.formUnavailable}</p>
      ) : null}
      {!siteKey ? (
        <p className="text-muted text-sm">{dictionary.formUnavailable}</p>
      ) : null}
    </form>
  );
}
