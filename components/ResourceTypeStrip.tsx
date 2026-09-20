"use client";

import Link from "next/link";
import {
  FileSpreadsheet,
  FileText,
  Palette,
  MonitorSmartphone,
  Presentation,
  FileArchive,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ResourceTypeStrip() {
  const { t, isRTL } = useLanguage();

  const types = [
    {
      name: t("all_resources"),
      Icon: MonitorSmartphone,
      href: "/templates",
      desc: isRTL ? "جميع الصيغ" : "All formats",
    },
    {
      name: t("excel_template"),
      Icon: FileSpreadsheet,
      href: "/templates?type=Excel",
      desc: isRTL ? "جاهزة للتحميل" : "Ready to download",
    },
    {
      name: t("word_template"),
      Icon: FileText,
      href: "/templates?type=Word",
      desc: isRTL ? "جاهزة للتحميل" : "Ready to download",
    },
    {
      name: t("design"),
      Icon: Palette,
      href: "/templates?type=Design",
      desc: isRTL ? "جاهزة للتحميل" : "Ready to download",
    },
    {
      name: t("presentation"),
      Icon: Presentation,
      href: "/templates?type=Presentation",
      desc: isRTL ? "جاهزة للتحميل" : "Ready to download",
    },
    {
      name: t("website_template"),
      Icon: FileArchive,
      href: "/templates?type=Website",
      desc: isRTL ? "جاهزة للتحميل" : "Ready to download",
    },
  ];

  return (
    <section className="resource-strip">
      <div className="container resource-types">
        {types.map(({ name, Icon, href, desc }, i) => (
          <Link
            className={"resource-type " + (!i ? "active" : "")}
            href={href}
            key={href}
          >
            <span>
              <Icon size={21} />
            </span>
            <b>{name}</b>
            <small>{desc}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}
