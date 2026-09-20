"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ToolBreadcrumb({
  title,
  categorySlug,
  categoryName,
}: {
  title: any;
  categorySlug?: string;
  categoryName?: { ar: string; en: string };
}) {
  const { isRTL } = useLanguage();
  const Arrow = isRTL ? ChevronLeft : ChevronRight;

  const displayTitle =
    typeof title === "string"
      ? title
      : title?.ar || title?.en || String(title || "");

  const catLabel = categoryName
    ? isRTL
      ? categoryName.ar
      : categoryName.en
    : typeof categorySlug === "string"
      ? categorySlug.toUpperCase()
      : typeof categorySlug === "object" && categorySlug !== null
        ? (
            (categorySlug as any).slug ||
            (categorySlug as any).name ||
            ""
          ).toUpperCase()
        : String(categorySlug || "").toUpperCase();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "13px",
        color: "var(--muted)",
        marginBottom: "24px",
      }}
    >
      <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>
        {isRTL ? "الرئيسية" : "Home"}
      </Link>
      <Arrow size={14} />
      <Link
        href="/tools"
        style={{ color: "var(--muted)", textDecoration: "none" }}
      >
        {isRTL ? "الأدوات المجانية" : "Tools"}
      </Link>
      {categorySlug && catLabel && (
        <>
          <Arrow size={14} />
          <Link
            href={`/tools/${categorySlug}`}
            style={{ color: "var(--muted)", textDecoration: "none" }}
          >
            {catLabel}
          </Link>
        </>
      )}
      <Arrow size={14} />
      <span style={{ color: "var(--text)", fontWeight: 600 }}>
        {displayTitle}
      </span>
    </div>
  );
}
