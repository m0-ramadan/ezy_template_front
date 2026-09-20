"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Sun,
  Moon,
  Menu,
  X,
  ArrowRight,
  Globe,
  User as UserIcon,
  LogOut,
  Shield,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState, useRef, useMemo } from "react";
import { templates } from "@/data/templates";
import { getSiteSettings } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";
import MegaMenu from "@/components/MegaMenu";
import ResourcesMenu from "@/components/ResourcesMenu";

const popularTagsEn = [
  "Laravel",
  "Next.js",
  "React",
  "eCommerce",
  "Admin Dashboard",
  "Portfolio",
  "Excel Template",
  "Word Template",
];

const popularTagsAr = [
  "لارافيل",
  "نيكست جي اس",
  "رياكت",
  "متجر إلكتروني",
  "لوحة تحكم",
  "معرض أعمال",
  "قوالب إكسيل",
  "قوالب وورد",
];

export default function Header() {
  const { locale, toggleLanguage, t, isRTL } = useLanguage();
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [resourcesMenuOpen, setResourcesMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState<{
    id?: number;
    name?: string;
    email?: string;
    role?: string;
  } | null>(null);
  const [customLinks, setCustomLinks] = useState<[string, string][] | null>(
    null,
  );

  const searchBoxRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const megaMenuTimeout = useRef<NodeJS.Timeout | null>(null);
  const resourcesMenuTimeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const checkAuth = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ezy_auth_user");
      if (stored) {
        try {
          setCurrentUser(JSON.parse(stored));
        } catch {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    }
  };

  useEffect(() => {
    checkAuth();
    const handleStorage = () => checkAuth();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("ezy_auth_change", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("ezy_auth_change", handleStorage);
    };
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ezy_auth_token");
      localStorage.removeItem("ezy_auth_user");
      window.dispatchEvent(new Event("ezy_auth_change"));
      setCurrentUser(null);
      router.push("/");
    }
  };

  const popularTags = isRTL ? popularTagsAr : popularTagsEn;

  const defaultLinks: [string, string][] = useMemo(
    () => [
      [t("home"), "/"],
      [t("templates"), "/templates"],
      [isRTL ? "الموارد" : "Resources", "/resources"],
      [isRTL ? "الأدوات" : "Tools", "/tools"],
      [t("blog"), "/blog"],
      [t("services"), "/services"],
      [t("about"), "/about"],
    ],
    [t, isRTL],
  );

  const navLinks = customLinks || defaultLinks;

  const handleMegaMouseEnter = () => {
    if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
    setMegaMenuOpen(true);
  };

  const handleMegaMouseLeave = () => {
    megaMenuTimeout.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 150);
  };

  const handleResourcesMouseEnter = () => {
    if (resourcesMenuTimeout.current)
      clearTimeout(resourcesMenuTimeout.current);
    setResourcesMenuOpen(true);
  };

  const handleResourcesMouseLeave = () => {
    resourcesMenuTimeout.current = setTimeout(() => {
      setResourcesMenuOpen(false);
    }, 150);
  };

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("ezytheme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const enabled = saved ? saved === "dark" : prefers;
    setDark(enabled);
    document.documentElement.classList.toggle("dark", enabled);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("ezytheme", next ? "dark" : "light");
  }

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return templates
      .filter((tmpl) => {
        const text = [
          tmpl.name,
          tmpl.name_ar,
          tmpl.category,
          tmpl.category_ar,
          tmpl.tech,
          tmpl.tech_stack_ar,
          tmpl.resourceType,
          tmpl.description,
          tmpl.description_ar,
          ...(tmpl.formats || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return text.includes(q);
      })
      .slice(0, 5);
  }, [searchQuery]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      const lowerQ = q.toLowerCase();

      // Smart routing based on query content
      if (
        lowerQ.includes("excel") ||
        lowerQ.includes("إكسيل") ||
        lowerQ.includes("اكسل") ||
        lowerQ.includes("اكسيل") ||
        lowerQ.includes("ميزانية") ||
        lowerQ.includes("فاتورة") ||
        lowerQ.includes("حسابات")
      ) {
        router.push(`/excel-templates?search=${encodeURIComponent(q)}`);
      } else if (
        lowerQ.includes("word") ||
        lowerQ.includes("وورد") ||
        lowerQ.includes("سيرة ذاتية") ||
        lowerQ.includes("عقد") ||
        lowerQ.includes("تقرير")
      ) {
        router.push(`/word-templates?search=${encodeURIComponent(q)}`);
      } else if (
        lowerQ.includes("web") ||
        lowerQ.includes("موقع") ||
        lowerQ.includes("مواقع") ||
        lowerQ.includes("html") ||
        lowerQ.includes("wordpress") ||
        lowerQ.includes("ووردبريس")
      ) {
        router.push(`/website-templates?search=${encodeURIComponent(q)}`);
      } else if (
        lowerQ.includes("design") ||
        lowerQ.includes("تصميم") ||
        lowerQ.includes("تصاميم") ||
        lowerQ.includes("psd") ||
        lowerQ.includes("كانفا") ||
        lowerQ.includes("canva")
      ) {
        router.push(`/design-templates?search=${encodeURIComponent(q)}`);
      } else if (
        lowerQ.includes("presentation") ||
        lowerQ.includes("عرض") ||
        lowerQ.includes("عروض") ||
        lowerQ.includes("powerpoint") ||
        lowerQ.includes("بوربوينت")
      ) {
        router.push(`/presentation-templates?search=${encodeURIComponent(q)}`);
      } else {
        router.push(`/excel-templates?search=${encodeURIComponent(q)}`);
      }
    } else {
      router.push("/excel-templates");
    }
    setSearchOpen(false);
    setOpen(false);
  };

  return (
    <header ref={headerRef} className="header" style={{ position: "relative" }}>
      <div className="container nav">
        <Link
          href="/"
          className="logo"
          onClick={() => {
            setSearchOpen(false);
            setOpen(false);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <img
            src="/assets/logo.png"
            alt="EzyTemplate"
            className="logo-img light-only"
            style={{ height: "36px", width: "auto" }}
          />
          <img
            src="/assets/logo-white.png"
            alt="EzyTemplate"
            className="logo-img dark-only"
            style={{ height: "36px", width: "auto" }}
          />
        </Link>

        <nav className="menu" aria-label="Primary navigation">
          {navLinks.map(([label, href]) => {
            const isTemplates = href === "/templates";
            const isResources = href === "/resources";

            if (isTemplates) {
              return (
                <div
                  key={href}
                  onMouseEnter={handleMegaMouseEnter}
                  onMouseLeave={handleMegaMouseLeave}
                  style={{ position: "relative", display: "inline-block" }}
                >
                  <Link
                    href={href}
                    className="nav-link-animated"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span>{label}</span>
                    <ChevronDown size={14} />
                  </Link>
                  {megaMenuOpen && (
                    <MegaMenu onClose={() => setMegaMenuOpen(false)} />
                  )}
                </div>
              );
            }

            if (isResources) {
              return (
                <div
                  key={href}
                  onMouseEnter={handleResourcesMouseEnter}
                  onMouseLeave={handleResourcesMouseLeave}
                  style={{ position: "relative", display: "inline-block" }}
                >
                  <Link
                    href={href}
                    className="nav-link-animated"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span>{label}</span>
                    <ChevronDown size={14} />
                  </Link>
                  {resourcesMenuOpen && (
                    <ResourcesMenu
                      onClose={() => setResourcesMenuOpen(false)}
                    />
                  )}
                </div>
              );
            }

            return (
              <Link
                key={href + label}
                href={href}
                className="nav-link-animated"
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="actions">
          <button
            className="lang-btn"
            onClick={toggleLanguage}
            aria-label={t("switch_lang")}
            title={t("switch_lang")}
          >
            <Globe size={14} className="lang-btn-icon" />
            <span>{t("lang_name")}</span>
          </button>

          <button
            className="iconbtn theme-btn"
            aria-label="Theme toggle"
            onClick={toggleTheme}
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <div className="header-search-wrap" ref={searchBoxRef}>
            {!searchOpen ? (
              <button
                className="iconbtn search-icon-btn"
                aria-label="Open search"
                onClick={() => setSearchOpen(true)}
              >
                <Search size={16} />
              </button>
            ) : (
              <div className="header-search-box-container">
                <form
                  onSubmit={handleSearchSubmit}
                  className="header-search-box"
                >
                  <Search size={15} className="header-search-box-icon" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    className="header-search-input"
                    placeholder={t("search_placeholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="header-search-clear"
                      onClick={() => setSearchQuery("")}
                    >
                      <X size={13} />
                    </button>
                  )}
                  <button type="submit" className="header-search-submit">
                    {t("search_btn")}
                  </button>
                  <button
                    type="button"
                    className="header-search-close"
                    onClick={() => setSearchOpen(false)}
                  >
                    <X size={15} />
                  </button>
                </form>
              </div>
            )}
          </div>

          {currentUser ? (
            <div
              className="desktop-only-auth"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              {currentUser.role === "admin" && (
                <a
                  href="http://localhost:8002/admin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="iconbtn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    background: "rgba(37, 99, 235, 0.1)",
                    color: "var(--blue)",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  <Shield size={14} />
                  <span>{isRTL ? "الإدارة" : "Admin"}</span>
                </a>
              )}
              <Link href="/profile" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    background: "var(--card-bg, #ffffff)",
                    border: "1px solid var(--line, #e2e8f0)",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--text, #0f172a)",
                  }}
                >
                  <span>
                    {currentUser.name || currentUser.email?.split("@")[0]}
                  </span>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="iconbtn"
                style={{ color: "#ef4444" }}
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <div className="desktop-only-auth">
              <Link
                href="/login"
                style={{
                  marginRight: isRTL ? 0 : "10px",
                  marginLeft: isRTL ? "10px" : 0,
                }}
              >
                {t("login")}
              </Link>
              <Link className="signup" href="/signup">
                {t("signup")}
              </Link>
            </div>
          )}

          <button
            className="iconbtn mobile-menu"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {/* Search Box inside Mobile Drawer */}
          <form onSubmit={handleSearchSubmit} className="mobile-search-form">
            <Search size={16} />
            <input
              type="text"
              placeholder={t("search_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">{t("search_btn")}</button>
          </form>

          {/* Navigation Links */}
          {navLinks.map(([label, href]) => (
            <Link key={href + label} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}

          {/* Auth & User section in Mobile Drawer */}
          <div
            style={{
              marginTop: "8px",
              paddingTop: "12px",
              borderTop: "1px solid var(--line)",
            }}
          >
            {currentUser ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontWeight: 700,
                    color: "var(--blue)",
                  }}
                >
                  <UserIcon size={16} />
                  <span>{currentUser.name || currentUser.email}</span>
                </Link>
                {currentUser.role === "admin" && (
                  <a
                    href="http://localhost:8002/admin"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontWeight: 700,
                      color: "#7c3aed",
                    }}
                  >
                    <Shield size={16} />
                    <span>
                      {isRTL ? "لوحة التحكم (Admin)" : "Admin Dashboard"}
                    </span>
                  </a>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "none",
                    border: "none",
                    color: "#ef4444",
                    fontWeight: 700,
                    cursor: "pointer",
                    padding: "6px 0",
                    font: "inherit",
                  }}
                >
                  <LogOut size={16} />
                  <span>{isRTL ? "تسجيل الخروج" : "Logout"}</span>
                </button>
              </div>
            ) : (
              <div className="mobile-auth-links">
                <Link
                  href="/login"
                  className="mobile-login-btn"
                  onClick={() => setOpen(false)}
                >
                  {t("login")}
                </Link>
                <Link
                  href="/signup"
                  className="signup mobile-signup-btn"
                  onClick={() => setOpen(false)}
                >
                  {t("signup")}
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
