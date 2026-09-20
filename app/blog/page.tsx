"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Search, Clock, CalendarDays } from "lucide-react";
import { getArticles, getAssetUrl } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

const defaultArticles = [
  {
    category: "Web Design",
    title: "10 Modern Web Design Trends for 2026",
    title_ar: "أهم 10 اتجاهات حديثة في تصميم الويب لعام 2026",
    slug: "10-modern-web-design-trends-for-2026",
    excerpt:
      "Explore the latest web design trends that will dominate in 2026, from AI-powered interfaces to immersive user experiences.",
    excerpt_ar:
      "استكشف أحدث اتجاهات تصميم الويب التي ستهيمن في 2026، من واجهات الذكاء الاصطناعي إلى تجارب المستخدم الغامرة.",
    cover_image: "/assets/blog-web-card.png",
    author_name: "Ahmed Ali",
    author_name_ar: "أحمد علي",
    date: "Sep 5, 2026",
    reading_time: 8,
  },
  {
    category: "Next.js",
    title: "Complete Guide to Next.js 15 for Beginners",
    title_ar: "الدليل الشامل لتعلم Next.js 15 للمبتدئين",
    slug: "complete-guide-to-next-js-for-beginners",
    excerpt:
      "Learn Next.js 15 from scratch with practical examples, project structure, and deployment tips.",
    excerpt_ar:
      "تعلم إطار العمل Next.js 15 من الصفر مع أمثلة عملية وهيكلة المشاريع ونصائح النشر.",
    cover_image: "/assets/blog-next-card.png",
    author_name: "Sara Mohamed",
    author_name_ar: "سارة محمد",
    date: "Sep 2, 2026",
    reading_time: 12,
  },
  {
    category: "Laravel",
    title: "Build a Complete Laravel Ecommerce Project",
    title_ar: "بناء متجر إلكتروني متكامل باستخدام Laravel",
    slug: "build-a-complete-laravel-ecommerce-project",
    excerpt:
      "Step-by-step tutorial to build a full ecommerce website with Laravel 11, including payment integration.",
    excerpt_ar:
      "شرح خطوة بخطوة لبناء متجر إلكتروني متكامل باستخدام Laravel 11 مع ربط بوابات الدفع.",
    cover_image: "/assets/blog-laravel-card.png",
    author_name: "Omar Khaled",
    author_name_ar: "عمر خالد",
    date: "Aug 28, 2026",
    reading_time: 10,
  },
  {
    category: "UI/UX",
    title: "UI/UX Best Practices for Higher Conversions",
    title_ar: "أفضل ممارسات UI/UX لزيادة معدل التحويل والمبيعات",
    slug: "ui-ux-best-practices-for-higher-conversions",
    excerpt:
      "Learn proven UI/UX techniques to improve user engagement and boost conversion rates.",
    excerpt_ar:
      "تعرف على تقنيات مجربة في تجربة وواجهة المستخدم لزيادة تفاعل الزوار ومعدلات الشراء.",
    cover_image: "/assets/blog-ui-card.png",
    author_name: "Nourhan Tarek",
    author_name_ar: "نورهان طارق",
    date: "Aug 25, 2026",
    reading_time: 8,
  },
  {
    category: "eCommerce",
    title: "How to Create a High-Converting Product Page",
    title_ar: "كيفية تصميم صفحة منتج احترافية تزيد المبيعات",
    slug: "how-to-create-a-high-converting-product-page",
    excerpt:
      "Tips and examples to design product pages that increase sales and build customer trust.",
    excerpt_ar:
      "نصائح ونماذج لتصميم صفحات منتجات ترفع المبيعات وتبني ثقة العملاء.",
    cover_image: "/assets/blog-ecom-card.png",
    author_name: "Mostafa Ezz",
    author_name_ar: "مصطفى عز",
    date: "Aug 20, 2026",
    reading_time: 9,
  },
  {
    category: "WordPress",
    title: "Top 10 Free WordPress Themes for 2026",
    title_ar: "أفضل 10 قوالب ووردبريس مجانية لعام 2026",
    slug: "top-10-free-wordpress-themes-for-2026",
    excerpt:
      "A curated list of the best free WordPress themes for blogs, business, and ecommerce websites.",
    excerpt_ar:
      "قائمة مختارة لأفضل قوالب ووردبريس المجانية للمدونات والمواقع التجارية والشركات.",
    cover_image: "/assets/blog-wp-card.png",
    author_name: "Layla Hassan",
    author_name_ar: "ليلى حسن",
    date: "Aug 18, 2026",
    reading_time: 7,
  },
];

export default function Blog() {
  const { t, isRTL } = useLanguage();
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedCat, setSelectedCat] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getArticles({ per_page: 20 })
      .then((res) => {
        if (res?.data?.length > 0) setArticles(res.data);
      })
      .catch(() => {});
  }, []);

  const categoryTranslations: Record<string, string> = {
    "All Articles": "جميع المقالات",
    "Web Design": "تصميم المواقع",
    "Next.js": "نيكست جي اس",
    Laravel: "لارافيل",
    "UI/UX": "واجهات وتجربة المستخدم",
    eCommerce: "تجارة إلكترونية",
    WordPress: "ووردبريس",
  };

  const getArticleCatLabel = (c: string) => {
    if (!isRTL) return c;
    return categoryTranslations[c] || c;
  };

  const categories = useMemo(
    () => [
      isRTL ? "جميع المقالات" : "All Articles",
      isRTL ? "تصميم المواقع" : "Web Design",
      isRTL ? "نيكست جي اس" : "Next.js",
      isRTL ? "لارافيل" : "Laravel",
      isRTL ? "واجهات وتجربة المستخدم" : "UI/UX",
      isRTL ? "تجارة إلكترونية" : "eCommerce",
      isRTL ? "ووردبريس" : "WordPress",
    ],
    [isRTL],
  );

  const posts = useMemo(() => {
    const list =
      articles.length > 0
        ? articles.map((a: any) => ({
            category: a.category || "General",
            title: isRTL ? a.title_ar || a.title : a.title,
            slug: a.slug,
            excerpt:
              (isRTL ? a.excerpt_ar || a.excerpt : a.excerpt || a.excerpt_ar) ||
              "",
            cover_image: getAssetUrl(
              a.cover_image || "/assets/blog-web-card.png",
            ),
            author_name:
              (isRTL ? a.author_name_ar : a.author_name) ||
              (isRTL ? "فريق إيزي تمبلت" : "EzyTemplate Team"),
            date: a.published_at
              ? new Date(a.published_at).toLocaleDateString(
                  isRTL ? "ar-EG" : "en-US",
                  { month: "short", day: "numeric", year: "numeric" },
                )
              : isRTL
                ? "مؤخراً"
                : "Recent",
            reading_time: a.reading_time || 8,
          }))
        : defaultArticles.map((a) => ({
            category: a.category,
            title: isRTL ? a.title_ar : a.title,
            slug: a.slug,
            excerpt: isRTL ? a.excerpt_ar : a.excerpt,
            cover_image: a.cover_image,
            author_name: isRTL ? a.author_name_ar : a.author_name,
            date: isRTL ? "2026" : a.date,
            reading_time: a.reading_time,
          }));

    return list.filter((p) => {
      const pCatLabel = getArticleCatLabel(p.category).toLowerCase();
      const pCatRaw = p.category.toLowerCase();
      const sel = selectedCat.toLowerCase();
      const matchesCat =
        selectedCat === "All" ||
        selectedCat === "All Articles" ||
        selectedCat === "جميع المقالات" ||
        pCatRaw === sel ||
        pCatLabel === sel;
      const q = query.trim().toLowerCase();
      const matchesQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [articles, selectedCat, query, isRTL]);

  return (
    <main className="container section blog-page">
      <div className="breadcrumbs">
        <Link href="/">{t("home")}</Link>　›　<b>{t("blog")}</b>
      </div>

      <span className="eyebrow">{t("blog_eyebrow")}</span>
      <h1>{t("blog_title")}</h1>
      <p className="lead">{t("blog_lead")}</p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "14px",
          marginTop: "24px",
          marginBottom: "28px",
        }}
      >
        <div
          className="category-tabs"
          style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
        >
          {categories.map((c) => (
            <button
              key={c}
              className={`pill ${selectedCat === c || (c === categories[0] && selectedCat === "All") ? "active" : ""}`}
              onClick={() => setSelectedCat(c)}
              style={{
                cursor: "pointer",
                padding: "7px 14px",
                fontSize: "11px",
                fontWeight: 600,
                borderRadius: "999px",
                border: "1px solid var(--line)",
                background:
                  selectedCat === c ||
                  (c === categories[0] && selectedCat === "All")
                    ? "var(--blue)"
                    : "var(--card)",
                color:
                  selectedCat === c ||
                  (c === categories[0] && selectedCat === "All")
                    ? "#fff"
                    : "inherit",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div
          className="search"
          style={{
            minWidth: "260px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            borderRadius: "999px",
            background: "var(--card)",
            border: "1px solid var(--line)",
          }}
        >
          <Search
            size={15}
            style={{ color: "var(--muted)", marginInlineEnd: "8px" }}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("blog_search_placeholder")}
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "11px",
              width: "100%",
              color: "inherit",
            }}
          />
        </div>
      </div>

      <div className="article-grid">
        {posts.map((p) => (
          <article className="article-card" key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="thumb">
              <img src={p.cover_image} alt={p.title} />
              <span className="category-badge">
                {getArticleCatLabel(p.category)}
              </span>
            </Link>
            <div className="article-body">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "10px",
                  color: "var(--muted)",
                  marginBottom: "8px",
                }}
              >
                <span>{p.author_name}</span>
                <span>•</span>
                <span>{p.date}</span>
                <span>•</span>
                <span>
                  {p.reading_time} {t("min_read")}
                </span>
              </div>
              <Link href={`/blog/${p.slug}`}>
                <h3>{p.title}</h3>
              </Link>
              <p>{p.excerpt}</p>
              <Link className="read-more" href={`/blog/${p.slug}`}>
                {isRTL ? "قراءة المقال ←" : "Read Article →"}
              </Link>
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            background: "var(--card)",
            borderRadius: "14px",
            border: "1px solid var(--line)",
          }}
        >
          <h3>{isRTL ? "لا توجد مقالات مطابقة" : "No Articles Found"}</h3>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "12px",
              marginTop: "6px",
            }}
          >
            {isRTL
              ? "جرب البحث بكلمة أخرى أو اختر تصنيفاً مختلفاً."
              : "Try another search keyword or select a different category."}
          </p>
        </div>
      )}
    </main>
  );
}
