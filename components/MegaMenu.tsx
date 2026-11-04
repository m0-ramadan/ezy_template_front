"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { NavGroup } from "@/lib/navigation";
import {
  Globe,
  FileSpreadsheet,
  FileText,
  Palette,
  Presentation,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface MegaMenuProps {
  onClose: () => void;
  navGroups?: NavGroup[];
}

export default function MegaMenu({ onClose, navGroups }: MegaMenuProps) {
  const { isRTL } = useLanguage();

  const META: Record<
    string,
    { icon: React.ReactNode; color: string }
  > = {
    website: { icon: <Globe size={18} className="text-blue-500" />, color: "#2563eb" },
    excel: {
      icon: <FileSpreadsheet size={18} className="text-emerald-600" />,
      color: "#10b981",
    },
    word: { icon: <FileText size={18} className="text-blue-600" />, color: "#3b82f6" },
    design: { icon: <Palette size={18} className="text-pink-500" />, color: "#ec4899" },
    presentation: {
      icon: <Presentation size={18} className="text-purple-500" />,
      color: "#8b5cf6",
    },
    canva: { icon: <Sparkles size={18} className="text-amber-500" />, color: "#f59e0b" },
  };

  // Links come from the live catalogue facets, so the menu can never point at
  // a sub-category page that does not exist.
  const FALLBACK: NavGroup[] = [
    { key: "website", href: "/website-templates", title: "Website Templates", titleAr: "قوالب المواقع", items: [] },
    { key: "excel", href: "/excel-templates", title: "Excel Templates", titleAr: "قوالب إكسيل", items: [] },
    { key: "word", href: "/word-templates", title: "Word Templates", titleAr: "قوالب وورد", items: [] },
    { key: "design", href: "/design-templates", title: "Design Templates", titleAr: "قوالب التصميم", items: [] },
    { key: "presentation", href: "/presentation-templates", title: "Presentations", titleAr: "العروض التقديمية", items: [] },
  ];

  const megaColumns = ((navGroups && navGroups.length > 0 ? navGroups : FALLBACK)).map((group) => ({
    key: group.key,
    title: isRTL ? group.titleAr : group.title,
    href: group.href,
    icon: META[group.key]?.icon ?? <Globe size={18} />,
    color: META[group.key]?.color ?? "#2563eb",
    items: group.items.map((item) => ({
      label: isRTL ? item.labelAr : item.label,
      href: `${group.href}/${item.slug}`,
    })),
  }));

  return (
    <div
      className="mega-menu-panel shadow-2xl rounded-2xl border"
      style={{
        position: "fixed",
        top: "64px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(1160px, calc(100vw - 32px))",
        background: "var(--card-bg, #0b1329)",
        borderColor: "var(--line, #1e293b)",
        padding: "24px",
        zIndex: 9999,
        boxShadow: "0 20px 40px -15px rgba(0,0,0,0.4)",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
        }}
      >
        {megaColumns.map((col, idx) => (
          <div
            key={idx}
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <Link
              href={col.href}
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontWeight: 700,
                fontSize: "14px",
                color: "var(--text, #ffffff)",
                textDecoration: "none",
                paddingBottom: "8px",
                borderBottom: `2px solid ${col.color}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: col.color,
                }}
              >
                {col.icon}
              </div>
              <span>{col.title}</span>
            </Link>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              {col.items.map((item, itemIdx) => (
                <Link
                  key={itemIdx}
                  href={item.href}
                  onClick={onClose}
                  style={{
                    fontSize: "13px",
                    color: "var(--muted, #94a3b8)",
                    textDecoration: "none",
                    padding: "6px 8px",
                    borderRadius: "6px",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  className="mega-menu-item-link"
                >
                  <span>{item.label}</span>
                  <ChevronRight
                    size={12}
                    style={{
                      opacity: 0.5,
                      transform: isRTL ? "rotate(180deg)" : undefined,
                    }}
                  />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "20px",
          paddingTop: "16px",
          borderTop: "1px solid var(--line, #1e293b)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background:
            "linear-gradient(90deg, rgba(37, 99, 235, 0.1), rgba(124, 58, 237, 0.1))",
          padding: "12px 18px",
          borderRadius: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--text, #ffffff)",
          }}
        >
          <Sparkles size={16} className="text-purple-400" />
          <span>
            {isRTL
              ? "هل تبحث عن تصميم خاص لمشروعك؟"
              : "Looking for a custom design for your business?"}
          </span>
        </div>
        <Link
          href="/services"
          onClick={onClose}
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "#fff",
            background: "linear-gradient(90deg, #2563eb, #7c3aed)",
            padding: "6px 14px",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          {isRTL ? "اطلب خدمة خاصة" : "Request Custom Service"}
        </Link>
      </div>
    </div>
  );
}
