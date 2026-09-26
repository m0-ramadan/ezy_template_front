"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TemplateCard from "@/components/TemplateCard";
import {
  Search,
  Grid2X2,
  Code2,
  Atom,
  FileCode2,
  ShoppingCart,
  BarChart3,
  Image as ImageIcon,
  Briefcase,
  Newspaper,
  LayoutTemplate,
  Zap,
  MonitorCog,
  Settings2,
  Users,
  Globe,
  Sparkles as SparklesIcon,
  FileText,
  Palette,
  Presentation as PresentationIcon,
  FileSpreadsheet,
  Calendar,
  Share2,
  DollarSign,
  FileCheck,
  Layers,
  Stamp,
} from "lucide-react";
import {
  getHomeContent,
  getResources,
  getCategories,
  normalizeTemplate,
  getAssetUrl,
} from "@/lib/api";
import { templates as fallbackTemplates } from "@/data/templates";
import { useLanguage } from "@/context/LanguageContext";
import PageLoader from "@/components/PageLoader";

const iconMap: Record<string, any> = {
  Zap,
  MonitorCog,
  Settings2,
  Users,
  Grid2X2,
  Code2,
  FileCode2,
  Atom,
  ShoppingCart,
  BarChart3,
  Briefcase,
  Newspaper,
  LayoutTemplate,
};

export default function Home() {
  const router = useRouter();
  const { t, isRTL, locale } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [homeData, setHomeData] = useState<any>(null);
  const [displayTemplates, setDisplayTemplates] = useState<any[]>([]);
  const [categoriesData, setCategoriesData] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    Promise.allSettled([
      getHomeContent(),
      getResources({ per_page: 50 }),
      getCategories(),
    ]).then(([homeRes, resourcesRes, catRes]) => {
      if (!mounted) return;

      if (homeRes.status === "fulfilled" && homeRes.value) {
        setHomeData(homeRes.value);
      }

      if (
        resourcesRes.status === "fulfilled" &&
        resourcesRes.value?.data?.length > 0
      ) {
        const normalized = resourcesRes.value.data.map((item: any) =>
          normalizeTemplate(item, locale),
        );

        // Row 1: Website templates
        const webTemplates = normalized.filter(
          (t: any) =>
            t.resource_type_raw === "website" ||
            String(t.resourceType || "")
              .toLowerCase()
              .includes("website"),
        );

        // Row 2: Other templates (featured/popular design, excel, etc.)
        const otherTemplates = normalized.filter(
          (t: any) =>
            t.resource_type_raw !== "website" &&
            !String(t.resourceType || "")
              .toLowerCase()
              .includes("website"),
        );

        const combined = [
          ...webTemplates.slice(0, 4),
          ...otherTemplates.slice(0, 4),
        ];

        if (combined.length < 8) {
          setDisplayTemplates(normalized.slice(0, 8));
        } else {
          setDisplayTemplates(combined);
        }
      } else {
        setDisplayTemplates([]);
      }

      if (catRes.status === "fulfilled" && catRes.value?.length > 0) {
        setCategoriesData(catRes.value);
      }

      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [locale]);

  if (loading) {
    return <PageLoader />;
  }

  const hero = homeData?.hero || {};
  const heroEyebrow = isRTL
    ? hero.eyebrow_ar || t("hero_eyebrow")
    : hero.eyebrow || t("hero_eyebrow");
  const heroTitle = isRTL
    ? hero.title_ar || t("hero_title_1")
    : hero.title || t("hero_title_1");
  const heroHighlight = isRTL
    ? hero.highlight_text_ar || t("hero_title_2")
    : hero.highlight_text || t("hero_title_2");
  const heroLead = isRTL
    ? hero.lead_ar || t("hero_subtitle")
    : hero.lead || t("hero_subtitle");
  const heroNoteTitle = isRTL
    ? hero.note_title_ar || "مشروعك القادم"
    : hero.note_title || "Your Next Website";
  const heroNoteSubtitle = isRTL
    ? hero.note_subtitle_ar || "يبدأ هنا"
    : hero.note_subtitle || "Starts Here";

  const popularTags = isRTL
    ? homeData?.popular_tags_ar || [
        "لارافيل",
        "نيكست جي اس",
        "لوحة تحكم",
        "متجر إلكتروني",
        "معرض أعمال",
        "قوالب إكسيل",
      ]
    : homeData?.popular_tags || [
        "Laravel",
        "Next.js",
        "Admin Dashboard",
        "eCommerce",
        "Portfolio",
        "Excel",
      ];

  const benefits = useMemo(() => {
    if (homeData?.benefits?.length) {
      return homeData.benefits.map((b: any) => ({
        icon: b.icon,
        title: isRTL ? b.title_ar || b.title : b.title || b.title_ar,
        description: isRTL
          ? b.description_ar || b.description
          : b.description || b.description_ar,
      }));
    }
    return [
      {
        icon: "Zap",
        title: t("benefit_1_title"),
        description: t("benefit_1_desc"),
      },
      {
        icon: "MonitorCog",
        title: t("benefit_2_title"),
        description: t("benefit_2_desc"),
      },
      {
        icon: "Settings2",
        title: t("benefit_3_title"),
        description: t("benefit_3_desc"),
      },
      {
        icon: "Users",
        title: t("benefit_4_title"),
        description: t("benefit_4_desc"),
      },
    ];
  }, [homeData, t, isRTL]);

  const getCategoryIconAndHref = (slug: string, name: string) => {
    const s = slug.toLowerCase();
    const n = name.toLowerCase();

    if (
      !s ||
      s === "all" ||
      n.includes("all resources") ||
      n.includes("كل الموارد")
    ) {
      return { icon: Grid2X2, href: "/templates" };
    }
    if (s.includes("html") || n.includes("html") || n.includes("فرونت إند")) {
      return {
        icon: Code2,
        href: "/website-templates/html-css",
      };
    }
    if (s.includes("wordpress") || n.includes("wordpress")) {
      return {
        icon: Globe,
        href: "/website-templates/wordpress",
      };
    }
    if (s.includes("website") || n.includes("website") || n.includes("مواقع")) {
      return { icon: Globe, href: "/website-templates" };
    }
    if (s.includes("canva") || n.includes("canva") || n.includes("كانفا")) {
      return { icon: SparklesIcon, href: "/canva-templates" };
    }
    if (
      s.includes("resume") ||
      s.includes("cv") ||
      n.includes("resume") ||
      n.includes("سيرة ذاتية")
    ) {
      return { icon: FileText, href: "/word-templates/project-management" };
    }
    if (
      s.includes("calendar") ||
      n.includes("calendar") ||
      n.includes("تقاويم")
    ) {
      return {
        icon: Calendar,
        href: "/excel-templates/personal-financial-planning",
      };
    }
    if (s.includes("social") || n.includes("social") || n.includes("سوشيال")) {
      return { icon: Share2, href: "/design-templates/creative-design" };
    }
    if (
      s.includes("powerpoint") ||
      s.includes("presentation") ||
      n.includes("presentation") ||
      n.includes("عروض")
    ) {
      return { icon: PresentationIcon, href: "/presentation-templates" };
    }
    if (
      s.includes("finance") ||
      s.includes("accounting") ||
      n.includes("finance") ||
      n.includes("مالية")
    ) {
      return { icon: DollarSign, href: "/excel-templates/finance" };
    }
    if (
      s.includes("business") ||
      s.includes("letter") ||
      n.includes("letter") ||
      n.includes("خطابات")
    ) {
      return {
        icon: FileCheck,
        href: "/word-templates/business-financial-planning",
      };
    }
    if (
      s.includes("branding") ||
      s.includes("logo") ||
      n.includes("branding") ||
      n.includes("هوية")
    ) {
      return { icon: Stamp, href: "/design-templates/corporate-identity" };
    }
    if (s.includes("excel") || n.includes("excel") || n.includes("إكسيل")) {
      return { icon: FileSpreadsheet, href: "/excel-templates" };
    }
    if (s.includes("word") || n.includes("word") || n.includes("وورد")) {
      return { icon: FileText, href: "/word-templates" };
    }
    if (s.includes("design") || n.includes("design") || n.includes("تصميم")) {
      return { icon: Palette, href: "/design-templates" };
    }
    if (s.includes("ui") || s.includes("kit") || n.includes("ui")) {
      return { icon: Layers, href: "/ui-kits" };
    }
    return {
      icon: LayoutTemplate,
      href: `/templates?category=${encodeURIComponent(slug)}`,
    };
  };

  const cats = useMemo(() => {
    const list =
      categoriesData?.length > 0
        ? [
            {
              name: isRTL ? "كل الموارد" : "All Resources",
              slug: "",
              icon: Grid2X2,
              href: "/templates",
            },
            ...categoriesData.slice(0, 11).map((c: any) => {
              const categoryName = isRTL ? c.name_ar || c.name : c.name;
              const { icon, href } = getCategoryIconAndHref(
                c.slug,
                categoryName,
              );
              return {
                name: categoryName,
                slug: c.slug,
                icon,
                href,
              };
            }),
          ]
        : [
            {
              name: isRTL ? "كل الموارد" : "All Resources",
              slug: "",
              icon: Grid2X2,
              href: "/templates",
            },
            {
              name: isRTL ? "قوالب المواقع" : "Website Templates",
              slug: "website-templates",
              icon: Globe,
              href: "/website-templates",
            },
            {
              name: isRTL ? "قوالب كانفا" : "Canva Templates",
              slug: "canva-templates",
              icon: SparklesIcon,
              href: "/canva-templates",
            },
            {
              name: isRTL ? "السير الذاتية (CV)" : "Resumes & CVs",
              slug: "resumes-cvs",
              icon: FileText,
              href: "/word-templates/project-management",
            },
            {
              name: isRTL ? "التقاويم والتخطيط" : "Calendars",
              slug: "calendars",
              icon: Calendar,
              href: "/excel-templates/personal-financial-planning",
            },
            {
              name: isRTL ? "سوشيال ميديا" : "Social Media",
              slug: "social-media",
              icon: Share2,
              href: "/design-templates/creative-design",
            },
            {
              name: isRTL ? "فرونت إند (HTML/CSS)" : "HTML & CSS",
              slug: "html-css",
              icon: Code2,
              href: "/website-templates/html-css",
            },
            {
              name: isRTL ? "عروض بوربوينت" : "PowerPoint",
              slug: "presentation",
              icon: PresentationIcon,
              href: "/presentation-templates",
            },
            {
              name: isRTL ? "المالية والمحاسبة" : "Finance & Accounting",
              slug: "finance-accounting",
              icon: DollarSign,
              href: "/excel-templates/finance",
            },
            {
              name: isRTL ? "قوالب ووردبريس" : "WordPress",
              slug: "wordpress",
              icon: Globe,
              href: "/website-templates/wordpress",
            },
            {
              name: isRTL ? "خطابات الأعمال" : "Business Letters",
              slug: "business-letters",
              icon: FileCheck,
              href: "/word-templates/business-financial-planning",
            },
            {
              name: isRTL ? "الهوية واللوجو" : "Branding & Logos",
              slug: "branding-logos",
              icon: Stamp,
              href: "/design-templates/corporate-identity",
            },
          ];
    return list;
  }, [categoriesData, t, isRTL]);

  const featuredEyebrow = isRTL
    ? homeData?.featured_section?.eyebrow_ar || t("featured")
    : homeData?.featured_section?.eyebrow || t("featured");

  const featuredTitle = isRTL
    ? homeData?.featured_section?.title_ar || t("categories_title")
    : homeData?.featured_section?.title || t("categories_title");

  const featuredDesc = isRTL
    ? homeData?.featured_section?.description_ar || t("categories_subtitle")
    : homeData?.featured_section?.description || t("categories_subtitle");

  const ctaTitle = isRTL
    ? homeData?.cta?.title_ar || t("cta_title")
    : homeData?.cta?.title || t("cta_title");

  const ctaDesc = isRTL
    ? homeData?.cta?.description_ar || t("cta_subtitle")
    : homeData?.cta?.description || t("cta_subtitle");

  const ctaBtnText = isRTL
    ? homeData?.cta?.button_text_ar || `${t("cta_btn")} ←`
    : homeData?.cta?.button_text || `${t("cta_btn")} →`;

  return (
    <main>
      <section className="hero home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">{heroEyebrow}</span>
            <h1>
              {heroTitle}
              <br />
              <span className="gradient-text">{heroHighlight}</span>
            </h1>
            <div
              style={{
                display: "flex",
                gap: "14px",
                margin: "24px 0 28px",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/templates"
                className="btn primary"
                style={{
                  background: "linear-gradient(90deg, #2563eb, #7c3aed)",
                  color: "#ffffff",
                  padding: "14px 28px",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "15px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <span>
                  {isRTL ? "استكشف القوالب والتصاميم" : "Explore All Templates"}
                </span>
              </Link>
              <Link
                href="/website-templates"
                className="btn outline"
                style={{
                  background: "var(--card-bg, #ffffff)",
                  color: "var(--text, #0f172a)",
                  border: "1px solid var(--line, #e2e8f0)",
                  padding: "14px 28px",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "15px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                }}
              >
                <span>
                  {isRTL ? "قوالب المواقع الإلكترونية" : "Website Templates"}
                </span>
              </Link>
            </div>
            <div className="tags popular">
              <b>{t("popular_tags_label")}</b>
              {popularTags.map((x: string) => (
                <Link
                  href={`/templates?q=${encodeURIComponent(x)}`}
                  className="pill"
                  key={x}
                >
                  {x}
                </Link>
              ))}
            </div>
          </div>
          <div className="hero-art">
            <img
              className="hero-main"
              src={getAssetUrl(hero.hero_image || "/assets/hero-main.png")}
              alt="Hero Artwork"
            />
            <div className="float f1">
              <b>▰　{hero.stat_badge_1_val || "1000+"}</b>
              <small>
                {isRTL
                  ? hero.stat_badge_1_label_ar || "قالب مجاني ومدفوع"
                  : hero.stat_badge_1_label || "Free & Premium"}
              </small>
            </div>
            <div className="float f2">
              <b>
                ▣　
                {isRTL
                  ? hero.stat_badge_2_val_ar || "عصري"
                  : hero.stat_badge_2_val || "Modern"}
              </b>
              <small>
                {isRTL
                  ? hero.stat_badge_2_label_ar || "ومتجاوب بالكامل"
                  : hero.stat_badge_2_label || "& Responsive"}
              </small>
            </div>
            <div className="float f3">
              <b>
                {isRTL
                  ? hero.stat_badge_3_val_ar || "⚡ جاهزة للتحميل"
                  : hero.stat_badge_3_val || "⚡ Ready to"}
              </b>
              <small>
                {isRTL
                  ? hero.stat_badge_3_label_ar || "والتعديل الفوري"
                  : hero.stat_badge_3_label || "Deploy & Use"}
              </small>
            </div>
            <div className="hero-note">
              {heroNoteTitle}
              <br />
              <b>{heroNoteSubtitle}</b>
            </div>
          </div>
        </div>
      </section>

      <section className="category-strip">
        <div className="container">
          <div className="cat-row">
            {cats.map((c: any, i: number) => {
              const Icon = c.icon;
              return (
                <Link
                  href={c.href}
                  className={"cat " + (!i ? "active" : "")}
                  key={c.name + i}
                >
                  <Icon />
                  <span>{c.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section trending">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">{featuredEyebrow}</div>
              <h2>{featuredTitle}</h2>
              <p>{featuredDesc}</p>
            </div>
            <Link className="view" href="/templates">
              {t("view_all_templates")} {isRTL ? "←" : "→"}
            </Link>
          </div>
          <div className="cards">
            {displayTemplates.map((tItem: any) => (
              <TemplateCard key={tItem.slug || tItem.id} t={tItem} />
            ))}
          </div>
        </div>
      </section>

      <section className="section benefits-wrap">
        <div className="container benefits">
          {benefits.map((b: any, i: number) => {
            const Icon = iconMap[b.icon] || Zap;
            return (
              <div className="benefit" key={i}>
                <Icon />
                <b>{b.title}</b>
                <span>{b.description}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="cta">
        <div className="container cta-in">
          <div>
            <h3>{ctaTitle}</h3>
            <p>{ctaDesc}</p>
          </div>
          <Link
            className="whitebtn"
            href={homeData?.cta?.button_url || "/templates"}
          >
            {ctaBtnText}
          </Link>
        </div>
      </section>
    </main>
  );
}
