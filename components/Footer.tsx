"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { getSiteSettings, subscribeNewsletter } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

const SocialIcon = ({ name, size = 16 }: { name: string; size?: number }) => {
  const n = (name || "").toLowerCase();
  if (n.includes("github")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    );
  }
  if (
    n.includes("twitter") ||
    n.includes(" x") ||
    n === "x" ||
    n.includes("x/")
  ) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (n.includes("linkedin")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }
  if (n.includes("youtube")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
      </svg>
    );
  }
  if (n.includes("instagram")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    );
  }
  if (n.includes("facebook")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
};

const defaultSocialLinks = [
  { platform: "Twitter/X", url: "https://twitter.com" },
  { platform: "GitHub", url: "https://github.com" },
  { platform: "LinkedIn", url: "https://linkedin.com" },
  { platform: "YouTube", url: "https://youtube.com" },
  { platform: "Instagram", url: "https://instagram.com" },
];

export default function Footer() {
  const { locale, t, isRTL } = useLanguage();
  const [settings, setSettings] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [subMsg, setSubMsg] = useState("");

  useEffect(() => {
    getSiteSettings()
      .then(setSettings)
      .catch(() => {});
  }, []);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubStatus("loading");
    try {
      const res = await subscribeNewsletter(email);
      if (res.ok) {
        setSubStatus("success");
        setSubMsg(t("newsletter_success"));
        setEmail("");
      } else {
        setSubStatus("error");
        setSubMsg(
          res.message || (isRTL ? "فشل الاشتراك" : "Failed to subscribe"),
        );
      }
    } catch {
      setSubStatus("error");
      setSubMsg(
        isRTL
          ? "خطأ في الاتصال. يرجى المحاولة مرة أخرى."
          : "Network error. Please try again.",
      );
    }
    setTimeout(() => {
      setSubStatus("idle");
      setSubMsg("");
    }, 4000);
  }

  const defaultColumns = useMemo(
    () => [
      {
        title: isRTL ? "روابط سريعة" : "Quick Links",
        links: [
          { label: isRTL ? "الرئيسية" : "Home", url: "/" },
          {
            label: isRTL ? "القوالب والتصاميم" : "Templates",
            url: "/templates",
          },
          {
            label: isRTL ? "الموارد الرقمية" : "Resources",
            url: "/resources",
          },
          {
            label: isRTL ? "الأدوات المجانية" : "Free Tools",
            url: "/tools",
          },
          { label: isRTL ? "المدونة والمقالات" : "Blog", url: "/blog" },
          { label: isRTL ? "الخدمات والحلول" : "Services", url: "/services" },
          { label: isRTL ? "من نحن" : "About Us", url: "/about" },
        ],
      },
      {
        title: isRTL ? "الموارد والقوالب" : "Resources",
        links: [
          {
            label: isRTL ? "قوالب مجانية" : "Freebies",
            url: "/templates?price=Free",
          },
          {
            label: isRTL ? "حزم واجهات المستخدم" : "UI Kits",
            url: "/templates?cat=UI+Kit",
          },
          {
            label: isRTL ? "قوالب إكسيل" : "Excel Templates",
            url: "/templates?type=Excel",
          },
          {
            label: isRTL ? "قوالب وورد" : "Word Templates",
            url: "/templates?type=Word",
          },
          {
            label: isRTL ? "تصاميم وجرافيك" : "Design Resources",
            url: "/templates?type=Design",
          },
          {
            label: isRTL ? "الشروحات والمقالات" : "Documentation",
            url: "/blog",
          },
        ],
      },
      {
        title: isRTL ? "المساعدة والدعم" : "Help & Support",
        links: [
          { label: isRTL ? "الأسئلة الشائعة" : "FAQ", url: "/faq" },
          {
            label: isRTL ? "طلب تخصيص قالب" : "Custom Requests",
            url: "/custom-requests",
          },
          {
            label: isRTL ? "الدعم الفني" : "Technical Support",
            url: "/support",
          },
          { label: isRTL ? "تواصل معنا" : "Contact Us", url: "/contact" },
          {
            label: isRTL ? "سياسة الخصوصية" : "Privacy Policy",
            url: "/privacy",
          },
          {
            label: isRTL ? "شروط الاستخدام" : "Terms of Service",
            url: "/terms",
          },
        ],
      },
    ],
    [isRTL],
  );

  const footerTranslations: Record<string, string> = {
    // Column Titles
    "Quick Links": "روابط سريعة",
    Resources: "الموارد والقوالب",
    "Help & Support": "المساعدة والدعم",
    Help: "المساعدة",
    Support: "الدعم الفني",
    Company: "الشركة",
    Legal: "القانونية",

    // Link Labels
    Home: "الرئيسية",
    Templates: "القوالب والتصاميم",
    Categories: "الأقسام والتصنيفات",
    Blog: "المدونة والمقالات",
    About: "من نحن",
    "About Us": "من نحن",
    Documentation: "الشروحات والمقالات",
    Freebies: "قوالب مجانية",
    "UI Kits": "حزم واجهات المستخدم",
    "Excel Templates": "قوالب إكسيل",
    "Word Templates": "قوالب وورد",
    "Design Inspiration": "تصاميم وجرافيك",
    "Design Resources": "تصاميم وجرافيك",
    FAQ: "الأسئلة الشائعة",
    "Contact Us": "تواصل معنا",
    Contact: "تواصل معنا",
    "Custom Requests": "طلب تخصيص قالب",
    "Technical Support": "الدعم الفني",
    "Privacy Policy": "سياسة الخصوصية",
    "Terms of Service": "شروط الاستخدام",
    Pricing: "الأسعار",
    Services: "الخدمات والحلول",
  };

  const columns = useMemo(() => {
    if (!settings?.footer_columns?.length) return defaultColumns;
    return settings.footer_columns.map((col: any) => ({
      title: isRTL
        ? (col.title_ar && col.title_ar.trim()) ||
          footerTranslations[col.title] ||
          col.title
        : col.title || col.title_ar,
      links: (col.links || []).map((l: any) => ({
        label: isRTL
          ? (l.label_ar && l.label_ar.trim()) ||
            footerTranslations[l.label] ||
            l.label
          : l.label || l.label_ar,
        url: l.url,
      })),
    }));
  }, [settings, defaultColumns, isRTL]);

  const displayTagline = isRTL
    ? settings?.site_tagline_ar || t("footer_tagline")
    : settings?.site_tagline || t("footer_tagline");

  const displayCopyright = isRTL
    ? settings?.copyright_text_ar ||
      "© 2026 إيزي تمبلت بواسطة إيزي ستور. جميع الحقوق محفوظة."
    : settings?.copyright_text ||
      `© 2026 EzyTemplate by Ezystore. ${t("footer_copyright")}`;

  const displaySubtext = isRTL
    ? settings?.footer_subtext_ar || "ابنِ • ابتكر • شارك • انطلق"
    : settings?.footer_subtext || "Build • Create • Share • Grow";

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link
              href="/"
              className="logo"
              style={{
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <img
                src="/assets/logo.png"
                alt="EzyTemplate"
                className="logo-img light-only"
                style={{ height: "38px", width: "auto" }}
              />
              <img
                src="/assets/logo-white.png"
                alt="EzyTemplate"
                className="logo-img dark-only"
                style={{ height: "38px", width: "auto" }}
              />
            </Link>
            <p>{displayTagline}</p>
            <div
              className="socials"
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "14px",
                flexWrap: "wrap",
              }}
            >
              {(settings?.social_links?.length
                ? settings.social_links.filter(
                    (s: any) => s.is_active !== false,
                  )
                : defaultSocialLinks
              ).map((s: any, idx: number) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  title={s.platform}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "9px",
                    background: "var(--card)",
                    border: "1px solid var(--line)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--muted)",
                    transition: "all 0.2s ease",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--blue)";
                    e.currentTarget.style.borderColor = "var(--blue)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--muted)";
                    e.currentTarget.style.borderColor = "var(--line)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <SocialIcon name={s.icon || s.platform} size={17} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col: any, idx: number) => (
            <div key={idx}>
              <h4>{col.title}</h4>
              {col.links?.map((link: any, lIdx: number) => (
                <Link key={lIdx} href={link.url}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}

          <div>
            <h4>{isRTL ? "النشرة البريدية" : "Newsletter"}</h4>
            <p>
              {isRTL
                ? "احصل على أحدث القوالب والمقالات والتحديثات مباشرة في بريدك."
                : "Get the latest templates, articles, and updates directly in your inbox."}
            </p>
            <form
              onSubmit={handleSubscribe}
              className="newsletter"
              style={{ display: "flex", gap: "6px" }}
            >
              <input
                type="email"
                placeholder={t("newsletter_placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={subStatus === "loading"}
              />
              <button type="submit" disabled={subStatus === "loading"}>
                {subStatus === "loading" ? "..." : isRTL ? "←" : "→"}
              </button>
            </form>
            {subMsg && (
              <small
                style={{
                  display: "block",
                  marginTop: "6px",
                  color: subStatus === "success" ? "#10b981" : "#ef4444",
                  fontSize: "11px",
                  fontWeight: 600,
                }}
              >
                {subMsg}
              </small>
            )}
          </div>
        </div>

        <div className="copyright">
          <span>{displayCopyright}</span>
          <span>{displaySubtext}</span>
        </div>
      </div>
    </footer>
  );
}
