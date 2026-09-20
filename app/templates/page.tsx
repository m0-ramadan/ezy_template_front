"use client";

import Link from "next/link";
import {
  Globe,
  FileSpreadsheet,
  FileText,
  Palette,
  Presentation,
  FileBox,
  FolderKanban,
  LayoutGrid,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import CategoryHeaderBanner from "@/components/CategoryHeaderBanner";

export default function TemplatesHub() {
  const { isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const marketplaces = [
    {
      id: "excel",
      title: isRTL ? "قوالب إكسيل" : "Excel Templates",
      count: "500+ Templates",
      desc: isRTL
        ? "قوالب ومسطرات إكسيل احترافية للميزانيات، الفواتير، الحسابات، وإدارة المشاريع"
        : "Free and premium Excel templates for business, finance, planning, HR, invoicing & inventory",
      icon: <FileSpreadsheet className="text-emerald-500" size={32} />,
      color: "#10b981",
      href: "/excel-templates",
      badge: isRTL ? "سوق مستقل" : "Marketplace",
    },
    {
      id: "website",
      title: isRTL ? "قوالب المواقع الإلكترونية" : "Website Templates",
      count: "350+ Templates",
      desc: isRTL
        ? "تصاميم وقوالب مواقع متجاوبة HTML5, WordPress, React, Next.js, و Tailwind"
        : "Modern, responsive HTML, WordPress, React, Next.js & Tailwind website themes",
      icon: <Globe className="text-blue-500" size={32} />,
      color: "#2563eb",
      href: "/website-templates",
      badge: isRTL ? "سوق مستقل" : "Marketplace",
    },
    {
      id: "word",
      title: isRTL ? "قوالب وورد" : "Word Templates",
      count: "200+ Templates",
      desc: isRTL
        ? "نماذج سير ذاتية، خطابات رسمية، تقارير، وعقود جاهزة للطباعة والتعديل"
        : "Professional CVs, resumes, formal business letters, legal contracts, and reports",
      icon: <FileText className="text-blue-600" size={32} />,
      color: "#3b82f6",
      href: "/word-templates",
      badge: isRTL ? "سوق مستقل" : "Marketplace",
    },
    {
      id: "design",
      title: isRTL ? "قوالب التصميم" : "Design Templates",
      count: "400+ Templates",
      desc: isRTL
        ? "تصاميم سوشيال ميديا، هويات بصرية، مطبوعات، وفلايرز بصيغ PSD & AI"
        : "Social media kits, branding guidelines, flyers, and print templates in PSD & AI",
      icon: <Palette className="text-pink-500" size={32} />,
      color: "#ec4899",
      href: "/design-templates",
      badge: isRTL ? "سوق مستقل" : "Marketplace",
    },
    {
      id: "presentation",
      title: isRTL ? "العروض التقديمية" : "Presentation Templates",
      count: "150+ Decks",
      desc: isRTL
        ? "شرائح وقوالب بوربوينت، وجوجل سلايدز، وكينوت للشركات الناشئة"
        : "PowerPoint decks, Google Slides & Keynote presentations for business & startups",
      icon: <Presentation className="text-purple-500" size={32} />,
      color: "#8b5cf6",
      href: "/presentation-templates",
      badge: isRTL ? "سوق مستقل" : "Marketplace",
    },
    {
      id: "ui-kits",
      title: isRTL ? "واجهات مستخدم (UI Kits)" : "UI Kits",
      count: "120+ Kits",
      desc: isRTL
        ? "مكتبات مكونات وأنظمة تصميم كاملة لتطبيقات الجوال والمواقع"
        : "Full web & mobile UI kit design systems for Figma and Adobe XD",
      icon: <FileBox className="text-cyan-500" size={32} />,
      color: "#06b6d4",
      href: "/ui-kits",
      badge: isRTL ? "سوق مستقل" : "Marketplace",
    },
    {
      id: "graphic-assets",
      title: isRTL ? "عناصر الجرافيك" : "Graphic Assets",
      count: "600+ Assets",
      desc: isRTL
        ? "أيقونات، رسومات فيكتور، وخلفيات عالية الجودة للمصممين"
        : "Vector illustrations, icon packs, 3D assets, and textures",
      icon: <FolderKanban className="text-amber-500" size={32} />,
      color: "#f59e0b",
      href: "/graphic-assets",
      badge: isRTL ? "سوق مستقل" : "Marketplace",
    },
    {
      id: "canva",
      title: isRTL ? "قوالب كانفا (Canva)" : "Canva Templates",
      count: "250+ Templates",
      desc: isRTL
        ? "قوالب تصميم مباشرة قابلة للتعديل بضغطة زر على منصة Canva"
        : "Directly editable Canva social posts, presentations, and branding graphics",
      icon: <LayoutGrid className="text-teal-500" size={32} />,
      color: "#14b8a6",
      href: "/canva-templates",
      badge: isRTL ? "سوق مستقل" : "Marketplace",
    },
  ];

  return (
    <main
      className="container section templates-hub"
      style={{ paddingBottom: "80px" }}
    >
      {/* Breadcrumb */}
      <div
        className="breadcrumbs templates-hub-breadcrumbs"
        style={{ marginBottom: "20px" }}
      >
        <Link href="/">{isRTL ? "الرئيسية" : "Home"}</Link>　›　
        <b>{isRTL ? "مركز القوالب والموارد" : "Templates & Resources Hub"}</b>
      </div>

      {/* Hero Banner */}
      <CategoryHeaderBanner
        title={
          isRTL ? "جميع الأقسام والقوالب الجاهزة" : "All Template Marketplaces"
        }
        subtitle={
          isRTL
            ? "استكشف أسواق القوالب المتخصصة: إكسيل، وورد، كانفا، مواقع، عروض تقديمية، وتصميمات جرافيك."
            : "Explore dedicated template marketplaces: Excel, Word, Canva, Websites, Presentations & Graphics."
        }
        type="default"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Marketplace Hub Grid */}
      <div
        className="templates-hub-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "28px",
        }}
      >
        {marketplaces.map((m) => (
          <div
            key={m.id}
            style={{
              background: "var(--card-bg, #ffffff)",
              border: "1px solid var(--line, #e2e8f0)",
              borderRadius: "20px",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            className="marketplace-hub-card"
          >
            <div>
              <div
                className="marketplace-hub-card-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "16px",
                    background: `rgba(${
                      m.color === "#10b981"
                        ? "16,185,129"
                        : m.color === "#2563eb"
                          ? "37,99,235"
                          : m.color === "#3b82f6"
                            ? "59,130,246"
                            : m.color === "#ec4899"
                              ? "236,72,153"
                              : "139,92,246"
                    }, 0.1)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {m.icon}
                </div>
                <span
                  className="marketplace-hub-count"
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: "12px",
                    background: "rgba(37, 99, 235, 0.1)",
                    color: m.color,
                  }}
                >
                  {m.count}
                </span>
              </div>

              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "var(--text)",
                  marginBottom: "10px",
                }}
              >
                {m.title}
              </h2>

              <p
                style={{
                  fontSize: "14px",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                  marginBottom: "28px",
                }}
              >
                {m.desc}
              </p>
            </div>

            <Link
              href={m.href}
              className="marketplace-hub-link"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "14px",
                borderRadius: "12px",
                background: m.color,
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
                transition: "opacity 0.2s ease",
              }}
            >
              <span>
                {isRTL ? `دخول سوق ${m.title}` : `Explore ${m.title}`}
              </span>
              <ArrowRight
                size={16}
                style={{ transform: isRTL ? "rotate(180deg)" : undefined }}
              />
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
