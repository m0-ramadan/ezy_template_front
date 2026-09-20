"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  FileSpreadsheet,
  QrCode,
  FileText,
  Calculator,
  ArrowRight,
  Wrench,
  Sparkles,
  Layers,
  Scissors,
  Image as ImageIcon,
  Maximize,
  FileImage,
  Percent,
  TrendingUp,
  Tag,
  KeyRound,
  Palette,
  FileCode2,
  Crop,
  Sliders,
  Landmark,
  Calendar,
  FunctionSquare,
  Type,
  Eraser,
  Code2,
  Binary,
  Fingerprint,
  FileCode,
  Bot,
  Link as LinkIcon,
  ShoppingBag,
  Clock,
  Network as SitemapIcon,
} from "lucide-react";
import { Tool } from "@/data/tools";

const iconComponents: Record<string, any> = {
  FileSpreadsheet,
  QrCode,
  FileText,
  Calculator,
  Wrench,
  Sparkles,
  Layers,
  Scissors,
  Image: ImageIcon,
  Maximize,
  FileImage,
  Percent,
  TrendingUp,
  Tag,
  KeyRound,
  Palette,
  FileCode2,
  Crop,
  Sliders,
  Landmark,
  Calendar,
  FunctionSquare,
  Type,
  Eraser,
  Code2,
  Binary,
  Fingerprint,
  FileCode,
  Bot,
  Link: LinkIcon,
  ShoppingBag,
  Clock,
  Sitemap: SitemapIcon,
};

export default function ToolCard({ tool }: { tool: Tool }) {
  const { isRTL } = useLanguage();
  const IconComponent = iconComponents[tool.icon] || Wrench;

  const t = tool as any;
  const rawTitle = isRTL
    ? t.name_ar || t.title?.ar || t.name || t.title
    : t.name || t.title?.en || t.name_ar || t.title;
  const title =
    typeof rawTitle === "string"
      ? rawTitle
      : isRTL
        ? rawTitle?.ar || rawTitle?.en || t.slug
        : rawTitle?.en || rawTitle?.ar || t.slug;

  const rawDesc = isRTL
    ? t.short_description_ar || t.shortDescription?.ar || t.description_ar
    : t.short_description || t.shortDescription?.en || t.description;
  const desc =
    typeof rawDesc === "string"
      ? rawDesc
      : isRTL
        ? rawDesc?.ar || rawDesc?.en || ""
        : rawDesc?.en || rawDesc?.ar || "";

  const rawBadge = isRTL ? t.badge?.ar || "مجاني" : t.badge?.en || "Free";
  const badge =
    typeof rawBadge === "string"
      ? rawBadge
      : rawBadge?.ar || rawBadge?.en || "Free";

  return (
    <Link
      href={tool.href}
      style={{
        background: "var(--card-bg, #ffffff)",
        border: "1px solid var(--line, #e2e8f0)",
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textDecoration: "none",
        transition:
          "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
        boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
        position: "relative",
      }}
      className="tool-card-hover"
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              padding: "12px",
              borderRadius: "12px",
              background: "var(--bg, #f8fafc)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--blue, #2563eb)",
            }}
          >
            <IconComponent size={26} />
          </div>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: "12px",
              background: "rgba(37, 99, 235, 0.1)",
              color: "var(--blue, #2563eb)",
            }}
          >
            {badge}
          </span>
        </div>

        <h3
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "var(--text, #0f172a)",
            marginBottom: "8px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "13.5px",
            color: "var(--muted, #64748b)",
            lineHeight: 1.6,
            marginBottom: "20px",
          }}
        >
          {desc}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "10px 16px",
          borderRadius: "10px",
          background: "var(--bg, #f8fafc)",
          border: "1px solid var(--line, #e2e8f0)",
          color: "var(--text, #0f172a)",
          fontWeight: 600,
          fontSize: "13px",
          transition: "all 0.2s ease",
        }}
      >
        <span>{isRTL ? "استخدام الأداة" : "Use Tool"}</span>
        <ArrowRight
          size={14}
          style={{ transform: isRTL ? "rotate(180deg)" : undefined }}
        />
      </div>
    </Link>
  );
}
