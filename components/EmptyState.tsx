"use client";

import Link from "next/link";
import { FolderOpen, Plus, Sparkles, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}

export default function EmptyState({
  title,
  description,
  actionHref = "/templates",
  actionLabel,
}: EmptyStateProps) {
  const { isRTL } = useLanguage();

  const defaultTitle = isRTL
    ? "لا تتوفر قوالب في هذا القسم حالياً"
    : "No templates available in this section";

  const defaultDesc = isRTL
    ? "جاري تجهيز إضافة قوالب وموارد رقمية احترافية جديدة قريباً جداً لهذا القسم."
    : "New professional templates and resources will be added to this section very soon.";

  return (
    <div
      style={{
        width: "100%",
        padding: "64px 24px",
        borderRadius: "24px",
        background: "var(--card-bg, #ffffff)",
        border: "1px border-dashed var(--line, #e2e8f0)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
        margin: "20px 0",
      }}
    >
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "24px",
          background:
            "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(124,58,237,0.1))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#2563eb",
          marginBottom: "20px",
        }}
      >
        <FolderOpen size={36} />
      </div>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "4px 12px",
          borderRadius: "12px",
          background: "rgba(37, 99, 235, 0.08)",
          color: "#2563eb",
          fontSize: "12px",
          fontWeight: 600,
          marginBottom: "12px",
        }}
      >
        <Sparkles size={14} />
        <span>{isRTL ? "قريباً جداً" : "Coming Soon"}</span>
      </div>

      <h3
        style={{
          fontSize: "20px",
          fontWeight: 800,
          color: "var(--text, #0f172a)",
          marginBottom: "8px",
          maxWidth: "480px",
        }}
      >
        {title || defaultTitle}
      </h3>

      <p
        style={{
          fontSize: "14px",
          color: "var(--muted, #64748b)",
          maxWidth: "460px",
          lineHeight: 1.6,
          marginBottom: "24px",
        }}
      >
        {description || defaultDesc}
      </p>

      {actionHref && (
        <Link
          href={actionHref}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 22px",
            borderRadius: "12px",
            background: "linear-gradient(90deg, #2563eb, #7c3aed)",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "13px",
            textDecoration: "none",
            boxShadow: "0 8px 20px -5px rgba(37,99,235,0.3)",
          }}
        >
          <span>
            {actionLabel ||
              (isRTL ? "تصفح بقية القوالب" : "Browse All Templates")}
          </span>
          <ArrowLeft
            size={14}
            style={{ transform: isRTL ? "none" : "rotate(180deg)" }}
          />
        </Link>
      )}
    </div>
  );
}
