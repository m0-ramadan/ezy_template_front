"use client";

import Link from "next/link";
import {
  FolderKanban,
  FileBox,
  LayoutGrid,
  FileCheck,
  Gift,
  Wrench,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ResourcesHub() {
  const { isRTL } = useLanguage();

  const resources = [
    {
      id: "graphic-assets",
      title: isRTL ? "عناصر الجرافيك والتصميم" : "Graphic Assets",
      desc: isRTL
        ? "أيقونات، رسومات فيكتور، وخلفيات عالية الجودة للمصممين"
        : "Icons, vectors, 3D assets, and high-quality backgrounds",
      icon: <FolderKanban size={32} className="text-pink-500" />,
      color: "#ec4899",
      href: "/graphic-assets",
    },
    {
      id: "documents",
      title: isRTL ? "مستندات و PDF" : "Documents & Contracts",
      desc: isRTL
        ? "نماذج عقود قانونية، سير ذاتية، وتقارير جاهزة للطباعة والتعديل"
        : "Contracts, business agreements, resumes, and formal reports",
      icon: <FileCheck size={32} className="text-blue-500" />,
      color: "#3b82f6",
      href: "/word-templates",
    },
    {
      id: "canva",
      title: isRTL ? "قوالب كانفا (Canva)" : "Canva Templates",
      desc: isRTL
        ? "قوالب تصميم مباشرة قابلة للتعديل بضغطة زر على منصة Canva"
        : "Directly editable Canva social posts, presentations, and graphics",
      icon: <LayoutGrid size={32} className="text-cyan-500" />,
      color: "#06b6d4",
      href: "/canva-templates",
    },
    {
      id: "ui-kits",
      title: isRTL ? "واجهات مستخدم (UI Kits)" : "UI Kits",
      desc: isRTL
        ? "مكتبات مكونات وأنظمة تصميم كاملة لتطبيقات الجوال والمواقع"
        : "Full web & mobile UI kit design systems for Figma and Adobe XD",
      icon: <FileBox size={32} className="text-purple-500" />,
      color: "#8b5cf6",
      href: "/ui-kits",
    },
    {
      id: "tools",
      title: isRTL ? "أدوات وحاسبات إلكترونية" : "Web Tools & Calculators",
      desc: isRTL
        ? "أدوات برمجية مجانية، مولد فواتير، ومولد رموز QR"
        : "Free online invoice generators, QR generators, and dev tools",
      icon: <Wrench size={32} className="text-emerald-500" />,
      color: "#10b981",
      href: "/tools",
    },
    {
      id: "freebies",
      title: isRTL ? "موارد مجانية (Freebies)" : "Freebies & Giveaways",
      desc: isRTL
        ? "مجموعة ضخمة من القوالب والموارد المجانية 100% للمطورين والمصممين"
        : "100% free templates, spreadsheets, and design resources",
      icon: <Gift size={32} className="text-amber-500" />,
      color: "#f59e0b",
      href: "/excel-templates?price=free",
    },
  ];

  return (
    <main className="container section" style={{ paddingBottom: "80px" }}>
      {/* Breadcrumb */}
      <div className="breadcrumbs" style={{ marginBottom: "20px" }}>
        <Link href="/">{isRTL ? "الرئيسية" : "Home"}</Link>　›　
        <b>
          {isRTL
            ? "مركز الموارد والأدوات الرقمية"
            : "Resources & Digital Assets Hub"}
        </b>
      </div>

      {/* Hero Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e1b4b, #312e81)",
          borderRadius: "24px",
          padding: "48px 36px",
          color: "#fff",
          marginBottom: "48px",
          boxShadow: "0 20px 40px -15px rgba(0,0,0,0.3)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: isRTL ? "auto" : "-60px",
            left: isRTL ? "-60px" : "auto",
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(124, 58, 237, 0.4), transparent 70%)",
            borderRadius: "50%",
          }}
        />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "720px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.12)",
              fontSize: "12px",
              fontWeight: 600,
              marginBottom: "18px",
              backdropFilter: "blur(4px)",
            }}
          >
            <Sparkles size={14} className="text-purple-400" />
            <span>
              {isRTL
                ? "مكتبة الموارد الرقمية والأدوات"
                : "Digital Resources & Assets Hub"}
            </span>
          </div>

          <h1
            style={{
              fontSize: "36px",
              fontWeight: 800,
              marginBottom: "14px",
              lineHeight: 1.25,
            }}
          >
            {isRTL
              ? "استكشف أفضل الموارد والعناصر لمشروعك"
              : "Discover Powerful Resources for Your Next Project"}
          </h1>

          <p style={{ fontSize: "16px", color: "#c7d2fe", lineHeight: 1.6 }}>
            {isRTL
              ? "تصفح مكتبتنا الشاملة التي تضم عناصر الجرافيك، نماذج المستندات والـ PDF، واجهات المستخدم الكاملة، وأدوات الويب المريحة."
              : "Browse our comprehensive library of graphic assets, ready-to-edit Canva templates, UI kits, document formats, and online tools."}
          </p>
        </div>
      </div>

      {/* Resources Hub Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "28px",
        }}
      >
        {resources.map((resItem) => (
          <Link
            key={resItem.id}
            href={resItem.href}
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
              textDecoration: "none",
            }}
            className="marketplace-hub-card"
          >
            <div>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  background: `rgba(${
                    resItem.color === "#ec4899"
                      ? "236,72,153"
                      : resItem.color === "#3b82f6"
                        ? "59,130,246"
                        : resItem.color === "#06b6d4"
                          ? "6,182,212"
                          : resItem.color === "#8b5cf6"
                            ? "139,92,246"
                            : resItem.color === "#10b981"
                              ? "16,185,129"
                              : "245,158,11"
                  }, 0.1)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                {resItem.icon}
              </div>

              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "var(--text)",
                  marginBottom: "8px",
                }}
              >
                {resItem.title}
              </h2>

              <p
                style={{
                  fontSize: "14px",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                  marginBottom: "24px",
                }}
              >
                {resItem.desc}
              </p>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontWeight: 700,
                fontSize: "14px",
                color: resItem.color,
              }}
            >
              <span>{isRTL ? "استعرض الموارد" : "Explore Resources"}</span>
              <span style={{ transform: isRTL ? "rotate(180deg)" : "none" }}>
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
