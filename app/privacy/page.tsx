"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getCustomPageContent } from "@/lib/api";
import PageLoader from "@/components/PageLoader";

interface Section {
  title: string;
  title_ar?: string;
  content: string;
  content_ar?: string;
}

interface PrivacyData {
  title?: string;
  title_ar?: string;
  subtitle?: string;
  subtitle_ar?: string;
  last_updated?: string;
  sections?: Section[];
}

export default function PrivacyPage() {
  const { isRTL } = useLanguage();
  const [data, setData] = useState<PrivacyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    getCustomPageContent("privacy")
      .then((res) => {
        if (isMounted) {
          setData(res);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
  }, []);

  if (loading) return <PageLoader />;

  const title = isRTL
    ? data?.title_ar || "سياسة الخصوصية"
    : data?.title || "Privacy Policy";
  const subtitle = isRTL
    ? data?.subtitle_ar ||
      "نحن نلتزم بحماية بياناتك وشرح طريقة جمع واستخدام واستضافة البيانات بكل شفافية."
    : data?.subtitle ||
      "We are committed to protecting your personal data and providing clear info about privacy.";

  const sections = data?.sections || [];

  return (
    <div style={{ minHeight: "85vh", padding: "40px 16px 80px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "50px",
              background: "rgba(16, 185, 129, 0.15)",
              color: "#34d399",
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            <ShieldCheck size={16} />
            <span>{isRTL ? "أمان البيانات والخصوصية" : "Data Protection"}</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 800,
              marginBottom: "16px",
              color: "var(--text)",
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "var(--muted)",
              maxWidth: "640px",
              margin: "0 auto 20px",
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "var(--muted)",
              background: "var(--card-bg)",
              padding: "6px 14px",
              borderRadius: "20px",
              border: "1px solid var(--line)",
            }}
          >
            <Calendar size={14} />
            <span>
              {isRTL
                ? `آخر تحديث: ${data?.last_updated || "يناير 2026"}`
                : `Last Updated: ${data?.last_updated || "January 2026"}`}
            </span>
          </div>
        </div>

        {/* CONTENT SECTIONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {sections.map((sec, idx) => {
            const secTitle = isRTL
              ? sec.title_ar || sec.title
              : sec.title || sec.title_ar;
            const secContent = isRTL
              ? sec.content_ar || sec.content
              : sec.content || sec.content_ar;

            return (
              <div
                key={idx}
                style={{
                  background: "var(--card-bg)",
                  padding: "32px",
                  borderRadius: "20px",
                  border: "1px solid var(--line)",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.02)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "10px",
                      background: "rgba(16, 185, 129, 0.15)",
                      color: "#34d399",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "14px",
                    }}
                  >
                    {idx + 1}
                  </div>
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "var(--text)",
                    }}
                  >
                    {secTitle}
                  </h2>
                </div>

                <div
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.8,
                    color: "var(--muted)",
                    whiteSpace: "pre-line",
                  }}
                >
                  {secContent}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
