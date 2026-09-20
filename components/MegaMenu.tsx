"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
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
}

export default function MegaMenu({ onClose }: MegaMenuProps) {
  const { isRTL } = useLanguage();

  const megaColumns = [
    {
      title: isRTL ? "قوالب المواقع" : "Website Templates",
      icon: <Globe size={18} className="text-blue-500" />,
      color: "#2563eb",
      href: "/website-templates",
      items: [
        {
          label: isRTL ? "فرونت إند (HTML/CSS)" : "HTML & CSS",
          href: "/website-templates/html-css",
        },
        {
          label: isRTL ? "قوالب ووردبريس" : "WordPress Templates",
          href: "/website-templates/wordpress",
        },
        {
          label: isRTL ? "رياكت و نيكست جي اس" : "React & Next.js",
          href: "/website-templates/react-nextjs",
        },
        {
          label: isRTL ? "تايلويند كلاسيك" : "Tailwind CSS",
          href: "/website-templates/tailwind-css",
        },
      ],
    },
    {
      title: isRTL ? "قوالب إكسيل" : "Excel Templates",
      icon: <FileSpreadsheet size={18} className="text-emerald-600" />,
      color: "#10b981",
      href: "/excel-templates",
      items: [
        {
          label: isRTL ? "المحاسبة" : "Accounting",
          href: "/excel-templates/accounting",
        },
        {
          label: isRTL ? "المالية والأعمال" : "Finance",
          href: "/excel-templates/finance",
        },
        {
          label: isRTL
            ? "التخطيط المالي للأعمال"
            : "Business Financial Planning",
          href: "/excel-templates/business-financial-planning",
        },
        {
          label: isRTL ? "الموارد البشرية" : "Human Resources",
          href: "/excel-templates/human-resources",
        },
        {
          label: isRTL ? "إدارة المخزون" : "Inventory",
          href: "/excel-templates/inventory",
        },
        {
          label: isRTL
            ? "التخطيط المالي الشخصي"
            : "Personal Financial Planning",
          href: "/excel-templates/personal-financial-planning",
        },
        {
          label: isRTL ? "إدارة المشاريع" : "Project Management",
          href: "/excel-templates/project-management",
        },
        {
          label: isRTL ? "تسويق السوشيال ميديا" : "Social Media Marketing",
          href: "/excel-templates/social-media-marketing",
        },
      ],
    },
    {
      title: isRTL ? "قوالب وورد" : "Word Templates",
      icon: <FileText size={18} className="text-blue-600" />,
      color: "#3b82f6",
      href: "/word-templates",
      items: [
        {
          label: isRTL ? "التخطيط المالي للأعمال" : "Business Financial Planning",
          href: "/word-templates/business-financial-planning",
        },
        {
          label: isRTL ? "المالية" : "Finance",
          href: "/word-templates/finance",
        },
        {
          label: isRTL ? "إدارة المشاريع" : "Project Management",
          href: "/word-templates/project-management",
        },
      ],
    },
    {
      title: isRTL ? "قوالب التصميم" : "Design Templates",
      icon: <Palette size={18} className="text-pink-500" />,
      color: "#ec4899",
      href: "/design-templates",
      items: [
        {
          label: isRTL ? "كروت الأعمال" : "Business Cards",
          href: "/design-templates/business-cards",
        },
        {
          label: isRTL ? "الشهادات والدروع" : "Certificates & Awards",
          href: "/design-templates/certificates-awards",
        },
        {
          label: isRTL ? "الهوية المؤسسية" : "Corporate Identity",
          href: "/design-templates/corporate-identity",
        },
        {
          label: isRTL ? "المناسبات والدعوات" : "Events & Invitations",
          href: "/design-templates/events-invitations",
        },
      ],
    },
    {
      title: isRTL ? "العروض التقديمية" : "Presentations",
      icon: <Presentation size={18} className="text-purple-500" />,
      color: "#8b5cf6",
      href: "/presentation-templates",
      items: [
        {
          label: isRTL ? "تسويق السوشيال ميديا" : "Social Media Marketing",
          href: "/presentation-templates/social-media-marketing",
        },
      ],
    },
  ];

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
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
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
