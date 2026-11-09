"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  CONSENT_EVENT,
  CONSENT_OPEN_EVENT,
  readConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent";

/**
 * Bottom consent bar. It is deliberately non-blocking (no overlay, no modal) so
 * it cannot be mistaken for an interstitial, and both choices are equally easy
 * to reach. Advertising scripts only load after "Accept".
 */
export default function ConsentBanner() {
  const { isRTL } = useLanguage();
  const [choice, setChoice] = useState<ConsentChoice>("unknown");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    setChoice(stored);
    setOpen(stored === "unknown");
    setMounted(true);

    const onOpen = () => setOpen(true);
    const onChange = (event: Event) => {
      const detail = (event as CustomEvent<ConsentChoice>).detail;
      if (detail === "granted" || detail === "denied") setChoice(detail);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => {
      window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
      window.removeEventListener(CONSENT_EVENT, onChange);
    };
  }, []);

  const decide = (value: "granted" | "denied") => {
    writeConsent(value);
    setChoice(value);
    setOpen(false);
  };

  if (!mounted || !open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={isRTL ? "إعدادات ملفات الارتباط" : "Cookie settings"}
      style={{
        position: "fixed",
        left: "16px",
        right: "16px",
        bottom: "16px",
        zIndex: 9000,
        maxWidth: "860px",
        margin: "0 auto",
        background: "var(--card-bg, #ffffff)",
        color: "var(--text, #0f172a)",
        border: "1px solid var(--line, #e2e8f0)",
        borderRadius: "14px",
        boxShadow: "0 18px 40px -18px rgba(15, 23, 42, 0.45)",
        padding: "16px 18px",
        display: "flex",
        gap: "16px",
        alignItems: "center",
        flexWrap: "wrap",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      <Cookie size={22} style={{ flexShrink: 0, color: "#2563eb" }} />
      <p
        style={{
          flex: "1 1 320px",
          margin: 0,
          fontSize: "13px",
          lineHeight: 1.6,
          color: "var(--muted, #475569)",
        }}
      >
        {isRTL ? (
          <>
            نستخدم ملفات ارتباط ضرورية لتشغيل الموقع، وملفات إعلانية من Google
            فقط بعد موافقتك. راجع{" "}
            <Link href="/cookie-policy">سياسة ملفات الارتباط</Link> و
            <Link href="/privacy"> سياسة الخصوصية</Link>.
          </>
        ) : (
          <>
            We use essential cookies to run the site, and Google advertising
            cookies only after you agree. Read our{" "}
            <Link href="/cookie-policy">Cookie Policy</Link> and{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </>
        )}
      </p>

      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
        <button
          type="button"
          onClick={() => decide("denied")}
          style={{
            padding: "9px 16px",
            borderRadius: "9px",
            border: "1px solid var(--line, #cbd5e1)",
            background: "var(--bg, #f8fafc)",
            color: "var(--text, #0f172a)",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          {isRTL ? "رفض غير الضروري" : "Reject non-essential"}
        </button>
        <button
          type="button"
          onClick={() => decide("granted")}
          style={{
            padding: "9px 16px",
            borderRadius: "9px",
            border: "none",
            background: "#2563eb",
            color: "#fff",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          {isRTL ? "قبول الكل" : "Accept all"}
        </button>
      </div>
    </div>
  );
}
