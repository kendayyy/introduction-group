export type AnalyticsConfig = {
  provider?: "ga4" | "matomo";
  ga4Id?: string;
  matomoUrl?: string;
  matomoSiteId?: string;
};

export function shouldLoadAnalytics(
  consent: "unknown" | "accepted" | "rejected",
  config: AnalyticsConfig,
) {
  if (consent !== "accepted" || !config.provider) {
    return false;
  }

  if (config.provider === "ga4") {
    return Boolean(config.ga4Id);
  }

  return Boolean(config.matomoUrl && config.matomoSiteId);
}
