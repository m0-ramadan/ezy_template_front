"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Link as LinkIcon, Copy, Check } from "lucide-react";
import { trackToolEvent } from "@/lib/api";

export default function UTMBuilder() {
  const { isRTL } = useLanguage();
  const [url, setUrl] = useState("https://ezytemplate.com");
  const [source, setSource] = useState("facebook");
  const [medium, setMedium] = useState("cpc");
  const [campaign, setCampaign] = useState("summer_sale");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);

  trackToolEvent("utm-builder", "use_tool");

  let fullUrl = url;
  if (url) {
    try {
      const u = new URL(url.startsWith("http") ? url : `https://${url}`);
      if (source) u.searchParams.set("utm_source", source);
      if (medium) u.searchParams.set("utm_medium", medium);
      if (campaign) u.searchParams.set("utm_campaign", campaign);
      if (term) u.searchParams.set("utm_term", term);
      if (content) u.searchParams.set("utm_content", content);
      fullUrl = u.toString();
    } catch {
      fullUrl = url;
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        background: "var(--card-bg, #ffffff)",
        border: "1px solid var(--line, #e2e8f0)",
        borderRadius: "20px",
        padding: "32px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "24px",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "6px",
            }}
          >
            {isRTL ? "رابط الموقع الأصلي (Website URL):" : "Website URL:"}
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "6px",
            }}
          >
            {isRTL
              ? "مصدر الحملة (Campaign Source - utm_source):"
              : "Campaign Source (utm_source):"}
          </label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="google, newsletter, facebook"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "6px",
            }}
          >
            {isRTL
              ? "وسيط الحملة (Campaign Medium - utm_medium):"
              : "Campaign Medium (utm_medium):"}
          </label>
          <input
            type="text"
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            placeholder="cpc, banner, email"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "6px",
            }}
          >
            {isRTL
              ? "اسم الحملة (Campaign Name - utm_campaign):"
              : "Campaign Name (utm_campaign):"}
          </label>
          <input
            type="text"
            value={campaign}
            onChange={(e) => setCampaign(e.target.value)}
            placeholder="promo_2026"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
            }}
          />
        </div>
      </div>

      <div
        style={{
          background: "var(--bg, #f8fafc)",
          border: "1px solid var(--line)",
          borderRadius: "12px",
          padding: "16px",
          wordBreak: "break-all",
          fontFamily: "monospace",
          fontSize: "14px",
          color: "var(--blue)",
          marginBottom: "20px",
        }}
      >
        {fullUrl}
      </div>

      <button
        onClick={handleCopy}
        style={{
          padding: "12px 24px",
          borderRadius: "10px",
          background: copied ? "#16a34a" : "var(--blue)",
          color: "#fff",
          fontWeight: 700,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
        {copied
          ? isRTL
            ? "تم نسخ الرابط!"
            : "Copied Link!"
          : isRTL
            ? "نسخ رابط UTM"
            : "Copy Final UTM Link"}
      </button>
    </div>
  );
}
