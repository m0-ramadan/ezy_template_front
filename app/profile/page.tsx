"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Heart,
  Download,
  Trash2,
  ExternalLink,
  Shield,
  LogOut,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  FileArchive,
  Clock,
  CheckCircle2,
  FolderHeart,
  FileDown,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getResources, normalizeTemplate, getAssetUrl } from "@/lib/api";
import { templates as fallbackTemplates } from "@/data/templates";
import TemplateCard from "@/components/TemplateCard";
import PageLoader from "@/components/PageLoader";

interface DownloadItem {
  slug: string;
  name: string;
  name_ar?: string;
  category?: string;
  image?: string;
  resourceType?: string;
  downloadedAt: string;
  fileName?: string;
  size?: string;
  version?: string;
}

export default function ProfilePage() {
  const { t, isRTL } = useLanguage();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<
    "favorites" | "downloads" | "account"
  >("favorites");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);
  const [downloadHistory, setDownloadHistory] = useState<DownloadItem[]>([]);
  const [allTemplates, setAllTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load Auth User
  const checkAuth = () => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("ezy_auth_user");
        setCurrentUser(stored ? JSON.parse(stored) : null);
      } catch {
        setCurrentUser(null);
      }
    }
  };

  // Load Favorites from LocalStorage
  const loadFavorites = () => {
    if (typeof window !== "undefined") {
      try {
        const favs = JSON.parse(localStorage.getItem("ezy_favorites") || "[]");
        setFavoriteSlugs(Array.isArray(favs) ? favs.map(String) : []);
      } catch {
        setFavoriteSlugs([]);
      }
    }
  };

  // Load Download History from LocalStorage
  const loadDownloads = () => {
    if (typeof window !== "undefined") {
      try {
        const history = JSON.parse(
          localStorage.getItem("ezy_downloads") || "[]",
        );
        setDownloadHistory(Array.isArray(history) ? history : []);
      } catch {
        setDownloadHistory([]);
      }
    }
  };

  useEffect(() => {
    checkAuth();
    loadFavorites();
    loadDownloads();

    // Fetch all templates for favorite matching
    getResources({ per_page: 50 })
      .then((res) => {
        if (res?.data?.length > 0) {
          const norm = res.data.map((r: any) =>
            normalizeTemplate(r, isRTL ? "ar" : "en"),
          );
          setAllTemplates(norm);
        } else {
          setAllTemplates(fallbackTemplates);
        }
      })
      .catch(() => {
        setAllTemplates(fallbackTemplates);
      })
      .finally(() => setLoading(false));

    // Listen to changes in localStorage
    const handleFavChange = () => loadFavorites();
    const handleDownChange = () => loadDownloads();
    const handleAuthChange = () => checkAuth();

    window.addEventListener("ezy_favorites_change", handleFavChange);
    window.addEventListener("ezy_downloads_change", handleDownChange);
    window.addEventListener("ezy_auth_change", handleAuthChange);

    return () => {
      window.removeEventListener("ezy_favorites_change", handleFavChange);
      window.removeEventListener("ezy_downloads_change", handleDownChange);
      window.removeEventListener("ezy_auth_change", handleAuthChange);
    };
  }, [isRTL]);

  // Match Favorite Slugs to full Template objects
  const favoriteTemplates = useMemo(() => {
    if (favoriteSlugs.length === 0) return [];

    // Combine fetched templates and fallback templates for comprehensive matching
    const combined = [...allTemplates, ...fallbackTemplates];
    const uniqueMap = new Map();
    combined.forEach((item) => {
      const slug = String(item.slug || item.id);
      if (!uniqueMap.has(slug)) uniqueMap.set(slug, item);
    });

    return favoriteSlugs.map((slug) => uniqueMap.get(slug)).filter(Boolean);
  }, [favoriteSlugs, allTemplates]);

  const removeFavorite = (slug: string) => {
    if (typeof window !== "undefined") {
      const updated = favoriteSlugs.filter((s) => s !== String(slug));
      localStorage.setItem("ezy_favorites", JSON.stringify(updated));
      setFavoriteSlugs(updated);
      window.dispatchEvent(new Event("ezy_favorites_change"));
    }
  };

  const clearDownloads = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ezy_downloads");
      setDownloadHistory([]);
      window.dispatchEvent(new Event("ezy_downloads_change"));
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ezy_auth_token");
      localStorage.removeItem("ezy_auth_user");
      window.dispatchEvent(new Event("ezy_auth_change"));
      setCurrentUser(null);
      router.push("/");
    }
  };

  if (loading) return <PageLoader />;

  const displayName =
    currentUser?.name || (isRTL ? "مستخدم زائر" : "Guest Creator");
  const displayEmail =
    currentUser?.email ||
    (isRTL
      ? "قم بتسجيل الدخول لحفظ بياناتك سحابياً"
      : "Sign in to sync your profile across devices");

  return (
    <div style={{ minHeight: "85vh", padding: "40px 16px 80px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* USER PROFILE BANNER */}
        <div
          style={{
            background: "var(--card-bg)",
            borderRadius: "24px",
            border: "1px solid var(--line)",
            padding: "36px 32px",
            marginBottom: "32px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "24px",
            }}
          >
            {/* AVATAR & INFO */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  fontWeight: 800,
                  boxShadow: "0 6px 20px rgba(99, 102, 241, 0.3)",
                }}
              >
                {displayName.charAt(0).toUpperCase()}
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "4px",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "24px",
                      fontWeight: 800,
                      color: "var(--text)",
                      margin: 0,
                    }}
                  >
                    {displayName}
                  </h1>
                  {currentUser?.role === "admin" && (
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "20px",
                        background: "rgba(37, 99, 235, 0.15)",
                        color: "#60a5fa",
                        fontSize: "12px",
                        fontWeight: 700,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Shield size={13} />
                      Admin
                    </span>
                  )}
                </div>

                <p
                  style={{ fontSize: "14px", color: "var(--muted)", margin: 0 }}
                >
                  {displayEmail}
                </p>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {currentUser ? (
                <button
                  onClick={handleLogout}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 18px",
                    borderRadius: "12px",
                    background: "rgba(239, 68, 68, 0.1)",
                    color: "#ef4444",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  <LogOut size={16} />
                  <span>{isRTL ? "تسجيل الخروج" : "Logout"}</span>
                </button>
              ) : (
                <div style={{ display: "flex", gap: "10px" }}>
                  <Link
                    href="/login"
                    style={{
                      padding: "10px 20px",
                      borderRadius: "12px",
                      background: "var(--bg)",
                      color: "var(--text)",
                      border: "1px solid var(--line)",
                      fontSize: "14px",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    {isRTL ? "تسجيل الدخول" : "Login"}
                  </Link>
                  <Link
                    href="/signup"
                    style={{
                      padding: "10px 20px",
                      borderRadius: "12px",
                      background: "#6366f1",
                      color: "#ffffff",
                      border: "none",
                      fontSize: "14px",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    {isRTL ? "إنشاء حساب" : "Sign Up"}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* STATS CARDS BAR */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              marginTop: "28px",
              paddingTop: "24px",
              borderTop: "1px solid var(--line)",
            }}
          >
            <div
              onClick={() => setActiveTab("favorites")}
              style={{
                background:
                  activeTab === "favorites"
                    ? "rgba(244, 63, 94, 0.1)"
                    : "var(--bg)",
                border:
                  activeTab === "favorites"
                    ? "1px solid #f43f5e"
                    : "1px solid var(--line)",
                padding: "16px 20px",
                borderRadius: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  padding: "10px",
                  borderRadius: "12px",
                  background: "rgba(244, 63, 94, 0.15)",
                  color: "#f43f5e",
                }}
              >
                <Heart
                  size={22}
                  fill={activeTab === "favorites" ? "#f43f5e" : "none"}
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 800,
                    color: "var(--text)",
                  }}
                >
                  {favoriteSlugs.length}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--muted)",
                    fontWeight: 600,
                  }}
                >
                  {isRTL ? "القوالب المفضلة" : "Favorite Templates"}
                </div>
              </div>
            </div>

            <div
              onClick={() => setActiveTab("downloads")}
              style={{
                background:
                  activeTab === "downloads"
                    ? "rgba(16, 185, 129, 0.1)"
                    : "var(--bg)",
                border:
                  activeTab === "downloads"
                    ? "1px solid #10b981"
                    : "1px solid var(--line)",
                padding: "16px 20px",
                borderRadius: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  padding: "10px",
                  borderRadius: "12px",
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#10b981",
                }}
              >
                <FileDown size={22} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 800,
                    color: "var(--text)",
                  }}
                >
                  {downloadHistory.length}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--muted)",
                    fontWeight: 600,
                  }}
                >
                  {isRTL ? "سجل التحميلات" : "Downloaded Files"}
                </div>
              </div>
            </div>

            <Link
              href="/templates"
              style={{
                background: "var(--bg)",
                border: "1px solid var(--line)",
                padding: "16px 20px",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  padding: "10px",
                  borderRadius: "12px",
                  background: "rgba(99, 102, 241, 0.15)",
                  color: "#818cf8",
                }}
              >
                <Sparkles size={22} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "var(--text)",
                  }}
                >
                  {isRTL ? "استكشف القوالب" : "Browse Library"}
                </div>
                <div style={{ fontSize: "12px", color: "var(--muted)" }}>
                  {isRTL ? "تصفح آلاف القوالب" : "Explore all templates"}
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* TAB BUTTONS BAR */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "28px",
            borderBottom: "1px solid var(--line)",
            paddingBottom: "12px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setActiveTab("favorites")}
            style={{
              padding: "10px 22px",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              background:
                activeTab === "favorites" ? "#6366f1" : "var(--card-bg)",
              color: activeTab === "favorites" ? "#ffffff" : "var(--muted)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Heart
              size={18}
              fill={activeTab === "favorites" ? "#ffffff" : "none"}
            />
            <span>
              {isRTL ? "المفضلة" : "Favorites"} ({favoriteSlugs.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab("downloads")}
            style={{
              padding: "10px 22px",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              background:
                activeTab === "downloads" ? "#6366f1" : "var(--card-bg)",
              color: activeTab === "downloads" ? "#ffffff" : "var(--muted)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FileDown size={18} />
            <span>
              {isRTL ? "الملفات المحملة سابقاً" : "Download History"} (
              {downloadHistory.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab("account")}
            style={{
              padding: "10px 22px",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              background:
                activeTab === "account" ? "#6366f1" : "var(--card-bg)",
              color: activeTab === "account" ? "#ffffff" : "var(--muted)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <User size={18} />
            <span>{isRTL ? "بيانات الحساب" : "Account Info"}</span>
          </button>
        </div>

        {/* TAB 1: FAVORITES */}
        {activeTab === "favorites" && (
          <div>
            {favoriteTemplates.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  background: "var(--card-bg)",
                  borderRadius: "20px",
                  border: "1px dashed var(--line)",
                }}
              >
                <FolderHeart
                  size={56}
                  style={{ color: "var(--muted)", marginBottom: "16px" }}
                />
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    marginBottom: "8px",
                    color: "var(--text)",
                  }}
                >
                  {isRTL
                    ? "قائمة المفضلة فارغة حالياً"
                    : "Your Favorites List is Empty"}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: "var(--muted)",
                    maxWidth: "480px",
                    margin: "0 auto 24px",
                    lineHeight: 1.6,
                  }}
                >
                  {isRTL
                    ? "تصفح القوالب واضغط على أيقونة القلب في أي قالب للوصول إليه بسرعة هنا في أي وقت."
                    : "Explore our collection and click the heart icon on any template to save it here for easy access."}
                </p>
                <Link
                  href="/templates"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    borderRadius: "12px",
                    background: "#6366f1",
                    color: "#ffffff",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  <span>
                    {isRTL ? "تصفح القوالب الآن" : "Browse Templates Now"}
                  </span>
                  {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                </Link>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "24px",
                }}
              >
                {favoriteTemplates.map((templateItem) => (
                  <div
                    key={templateItem.slug || templateItem.id}
                    style={{ position: "relative" }}
                  >
                    <TemplateCard t={templateItem} buttons={true} />
                    <button
                      onClick={() =>
                        removeFavorite(templateItem.slug || templateItem.id)
                      }
                      title={
                        isRTL ? "إزالة من المفضلة" : "Remove from favorites"
                      }
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: isRTL ? "auto" : "12px",
                        left: isRTL ? "12px" : "auto",
                        background: "rgba(239, 68, 68, 0.9)",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "50%",
                        width: "32px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        zIndex: 5,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DOWNLOAD HISTORY */}
        {activeTab === "downloads" && (
          <div>
            {downloadHistory.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  background: "var(--card-bg)",
                  borderRadius: "20px",
                  border: "1px dashed var(--line)",
                }}
              >
                <FileDown
                  size={56}
                  style={{ color: "var(--muted)", marginBottom: "16px" }}
                />
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    marginBottom: "8px",
                    color: "var(--text)",
                  }}
                >
                  {isRTL
                    ? "لم تقم بتحميل أي ملفات بعد"
                    : "No Download History Yet"}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: "var(--muted)",
                    maxWidth: "480px",
                    margin: "0 auto 24px",
                    lineHeight: 1.6,
                  }}
                >
                  {isRTL
                    ? "عندما تقوم بتحميل أي قالب، سيتم حفظ نسخة منه هنا لتتمكن من إعادة تحميله بسهولة."
                    : "Whenever you download a template, it will be automatically recorded here for quick access."}
                </p>
                <Link
                  href="/templates"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    borderRadius: "12px",
                    background: "#6366f1",
                    color: "#ffffff",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  <span>
                    {isRTL
                      ? "تصفح القوالب للتحميل"
                      : "Explore Templates to Download"}
                  </span>
                  {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                </Link>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <span style={{ fontSize: "14px", color: "var(--muted)" }}>
                    {isRTL
                      ? `إجمالي الملفات: ${downloadHistory.length}`
                      : `Total Downloaded Files: ${downloadHistory.length}`}
                  </span>
                  <button
                    onClick={clearDownloads}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#ef4444",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Trash2 size={14} />
                    <span>
                      {isRTL ? "مسح سجل التحميلات" : "Clear Download History"}
                    </span>
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  {downloadHistory.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: "var(--card-bg)",
                        borderRadius: "16px",
                        border: "1px solid var(--line)",
                        padding: "18px 24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "16px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        <div
                          style={{
                            width: "54px",
                            height: "54px",
                            borderRadius: "12px",
                            background: "var(--bg)",
                            border: "1px solid var(--line)",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {item.image ? (
                            <img
                              src={getAssetUrl(item.image)}
                              alt={item.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <FileArchive
                              size={24}
                              style={{ color: "#6366f1" }}
                            />
                          )}
                        </div>

                        <div>
                          <h4
                            style={{
                              fontSize: "16px",
                              fontWeight: 700,
                              margin: "0 0 4px",
                              color: "var(--text)",
                            }}
                          >
                            {isRTL ? item.name_ar || item.name : item.name}
                          </h4>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              fontSize: "12px",
                              color: "var(--muted)",
                              flexWrap: "wrap",
                            }}
                          >
                            <span>{item.category || item.resourceType}</span>
                            <span>•</span>
                            <span>{item.size || "12.4 MB"}</span>
                            <span>•</span>
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <Clock size={12} />
                              {new Date(item.downloadedAt).toLocaleDateString(
                                isRTL ? "ar-EG" : "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/download?template=${item.slug}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "10px 20px",
                          borderRadius: "10px",
                          background: "#10b981",
                          color: "#ffffff",
                          fontWeight: 600,
                          fontSize: "13px",
                          textDecoration: "none",
                        }}
                      >
                        <Download size={15} />
                        <span>{isRTL ? "إعادة التحميل" : "Re-download"}</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ACCOUNT INFO */}
        {activeTab === "account" && (
          <div
            style={{
              background: "var(--card-bg)",
              borderRadius: "20px",
              border: "1px solid var(--line)",
              padding: "32px",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 800,
                marginBottom: "20px",
                color: "var(--text)",
              }}
            >
              {isRTL ? "بيانات الحساب الشخصي" : "Account Information"}
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "18px" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    marginBottom: "6px",
                    color: "var(--muted)",
                  }}
                >
                  {isRTL ? "اسم المستخدم" : "Full Name"}
                </label>
                <input
                  type="text"
                  readOnly
                  value={displayName}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontSize: "14px",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    marginBottom: "6px",
                    color: "var(--muted)",
                  }}
                >
                  {isRTL ? "البريد الإلكتروني" : "Email Address"}
                </label>
                <input
                  type="text"
                  readOnly
                  value={
                    currentUser?.email ||
                    (isRTL ? "زائر غير مسجل" : "Guest User")
                  }
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontSize: "14px",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    marginBottom: "6px",
                    color: "var(--muted)",
                  }}
                >
                  {isRTL ? "نوع الحساب" : "Account Type"}
                </label>
                <input
                  type="text"
                  readOnly
                  value={
                    currentUser
                      ? currentUser.role === "admin"
                        ? isRTL
                          ? "مدير النظام (Admin)"
                          : "Administrator"
                        : isRTL
                          ? "مستخدم مسجل"
                          : "Registered User"
                      : isRTL
                        ? "حساب زائر محلي"
                        : "Local Guest Session"
                  }
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
