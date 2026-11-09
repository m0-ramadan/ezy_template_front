"use client";

/**
 * Cookie consent state.
 *
 * AdSense and any other third-party advertising script must not run before the
 * visitor has made a choice: that is what sets Google's IDE/NID/3PSID cookies
 * and triggers Chrome's third-party-cookie warnings. Consent is stored in a
 * first-party cookie for one year and broadcast with a DOM event so the ad
 * loader can react without a page reload.
 */

export type ConsentChoice = "granted" | "denied" | "unknown";

export const CONSENT_COOKIE = "ezyconsent";
export const CONSENT_EVENT = "ezy:consent-change";
export const CONSENT_OPEN_EVENT = "ezy:consent-open";
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 365;

export function readConsent(): ConsentChoice {
  if (typeof document === "undefined") return "unknown";
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${CONSENT_COOKIE}=([^;]*)`),
  );
  const value = match?.[1];
  if (value === "granted" || value === "denied") return value;
  return "unknown";
}

export function writeConsent(choice: "granted" | "denied") {
  if (typeof document === "undefined") return;
  document.cookie = `${CONSENT_COOKIE}=${choice}; path=/; max-age=${CONSENT_MAX_AGE}; SameSite=Lax`;

  // Google Consent Mode v2: tell Google's tags about the decision so ad
  // storage stays denied until the visitor actually accepts.
  const state = choice === "granted" ? "granted" : "denied";
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") {
    gtag("consent", "update", {
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      analytics_storage: state,
    });
  }

  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
}

export function openConsentSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
