"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  FolderKanban,
  FileBox,
  LayoutGrid,
  FileCheck,
  Gift,
  Wrench,
} from "lucide-react";

interface ResourcesMenuProps {
  onClose: () => void;
}

export default function ResourcesMenu({ onClose }: ResourcesMenuProps) {
  const { isRTL } = useLanguage();

  const resources = [
    {
      title: isRTL ? "عناصر الجرافيك والتصميم" : "Graphic Assets",
      desc: isRTL
        ? "أيقونات، فيكتورز، وخلفيات عالية الجودة"
        : "Icons, vectors, and high-quality graphics",
      icon: <FolderKanban size={18} className="text-pink-500" />,
      href: "/graphic-assets",
    },
    {
      title: isRTL ? "مستندات و PDF" : "Documents & PDFs",
      desc: isRTL
        ? "نماذج عقود، نماذج عمل، وتقارير"
        : "Contracts, business models, and forms",
      icon: <FileCheck size={18} className="text-blue-500" />,
      href: "/word-templates",
    },
    {
      title: isRTL ? "قوالب كانفا (Canva)" : "Canva Templates",
      desc: isRTL
        ? "قوالب قابلة للتعديل المباشر على Canva"
        : "Directly editable Canva templates",
      icon: <LayoutGrid size={18} className="text-cyan-500" />,
      href: "/canva-templates",
    },
    {
      title: isRTL ? "واجهات مستخدم (UI Kits)" : "UI Kits",
      desc: isRTL
        ? "مجموعات واجهات كاملة لتطبيقات والمواقع"
        : "Full UI kits for Web and Mobile Apps",
      icon: <FileBox size={18} className="text-purple-500" />,
      href: "/ui-kits",
    },
    {
      title: isRTL ? "أدوات وحاسبات إلكترونية" : "Web Tools & Calculators",
      desc: isRTL
        ? "مولد فواتير، مولد QR، وحاسبات"
        : "Invoice generator, QR generator, calculators",
      icon: <Wrench size={18} className="text-emerald-500" />,
      href: "/tools",
    },
    {
      title: isRTL ? "موارد مجانية (Freebies)" : "Freebies & Giveaways",
      desc: isRTL
        ? "قوالب وموارد مجانية بالكامل للمصممين"
        : "100% free templates for creators",
      icon: <Gift size={18} className="text-amber-500" />,
      href: "/excel-templates?price=free",
    },
  ];

  return (
    <div
      className="resources-dropdown shadow-xl rounded-xl border"
      style={{
        position: "absolute",
        top: "100%",
        left: isRTL ? "auto" : "0",
        right: isRTL ? "0" : "auto",
        width: "360px",
        background: "var(--card-bg, #ffffff)",
        borderColor: "var(--line, #e2e8f0)",
        padding: "16px",
        marginTop: "12px",
        zIndex: 100,
        boxShadow: "0 15px 30px -10px rgba(0,0,0,0.12)",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {resources.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              padding: "10px",
              borderRadius: "8px",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            className="resources-dropdown-item"
          >
            <div
              style={{
                padding: "8px",
                borderRadius: "8px",
                background: "var(--bg, #f8fafc)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </div>
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "13px",
                  color: "var(--text)",
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--muted)",
                  marginTop: "2px",
                }}
              >
                {item.desc}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
