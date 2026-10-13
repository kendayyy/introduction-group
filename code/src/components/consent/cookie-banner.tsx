"use client";

import { useEffect, useSyncExternalStore } from "react";
import { shouldLoadAnalytics, type AnalyticsConfig } from "@/analytics/consent";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/dictionary";

const storageKey = "measurement-consent";
const changeEvent = "measurement-consent-change";

function subscribe(callback: () => void) {
  window.addEventListener(changeEvent, callback);
  return () => window.removeEventListener(changeEvent, callback);
}

function readConsent(): "unknown" | "accepted" | "rejected" {
  const stored = window.localStorage.getItem(storageKey);
  return stored === "accepted" || stored === "rejected" ? stored : "unknown";
}

function serverConsent(): "unknown" {
  return "unknown";
}

export function CookieBanner({
  dictionary,
  analytics,
}: {
  dictionary: Dictionary;
  analytics: AnalyticsConfig;
}) {
  const consent = useSyncExternalStore(subscribe, readConsent, serverConsent);

  useEffect(() => {
    if (!shouldLoadAnalytics(consent, analytics)) {
      return;
    }
    if (document.getElementById("measurement-script")) {
      return;
    }
    const script = document.createElement("script");
    script.id = "measurement-script";
    script.async = true;
    if (analytics.provider === "ga4" && analytics.ga4Id) {
      script.src = `https://www.googletagmanager.com/gtag/js?id=${analytics.ga4Id}`;
    }
    if (analytics.provider === "matomo" && analytics.matomoUrl) {
      script.src = analytics.matomoUrl;
    }
    document.head.append(script);
  }, [analytics, consent]);

  if (consent !== "unknown") {
    return null;
  }

  function choose(value: "accepted" | "rejected") {
    window.localStorage.setItem(storageKey, value);
    window.dispatchEvent(new Event(changeEvent));
  }

  return (
    <div className="border-border bg-background fixed inset-x-4 bottom-4 z-40 border p-4 shadow-none sm:left-auto sm:max-w-md">
      <h2 className="text-lg">{dictionary.consentTitle}</h2>
      <p className="text-muted mt-2 text-sm">{dictionary.consentBody}</p>
      <div className="mt-4 flex gap-3">
        <Button type="button" onClick={() => choose("accepted")}>
          {dictionary.consentAccept}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => choose("rejected")}
        >
          {dictionary.consentReject}
        </Button>
      </div>
    </div>
  );
}
