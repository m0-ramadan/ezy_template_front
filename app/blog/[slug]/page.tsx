"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getArticleBySlug, getAssetUrl } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

export default function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { t, isRTL } = useLanguage();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticleBySlug(slug).then(setArticle).catch(() => {}).finally(() => setLoading(false));
  }, [slug]);

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

  if (loading) return <main className="container article-detail"><p>{isRTL ? "جاري التحميل…" : "Loading…"}</p></main>;
  if (!article) return <main className="container article-detail"><h1>{isRTL ? "المقال غير موجود" : "Article not found"}</h1><Link href="/blog">{isRTL ? "العودة إلى المدونة" : "Back to blog"}</Link></main>;

  const title = isRTL ? article.title_ar || article.title : article.title || article.title_ar;
  const category = isRTL
    ? getArticleCatLabel(article.category || "General")
    : article.category || "General";
  const author = isRTL
    ? article?.author_name_ar || article?.author_name || "فريق إيزي تمبلت"
    : article?.author_name || "EzyTemplate Team";
  const readingTime = article.reading_time || null;
  const date = article?.published_at
    ? new Date(article.published_at).toLocaleDateString(
        isRTL ? "ar-EG" : "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        },
      )
    : isRTL
      ? "مؤخراً"
      : "Recent";
  const coverImg = getAssetUrl(
    article?.cover_image || "/assets/article-web.png",
  );
  const excerpt =
    (isRTL ? article.excerpt_ar || article.excerpt : article.excerpt || article.excerpt_ar) || "";

  const content =
    (isRTL
      ? article?.content_ar || article?.content
      : article?.content || article?.content_ar) || "";

  return (
    <main className="container article-detail">
      <div className="breadcrumbs">
        <Link href="/">{t("home")}</Link>　›　
        <Link href="/blog">{t("blog")}</Link>　›　
        <span>{category}</span>　›　<b>{title}</b>
      </div>

      <span className="eyebrow">{category}</span>
      <h1>{title}</h1>
      <div className="meta">
        {author} • {date}{readingTime ? ` • ${readingTime} ${t("min_read")}` : ""}
      </div>

      <img className="article-cover" src={coverImg} alt={title} />

      <div
        className="article-content"
        style={{ maxWidth: "780px", margin: "0 auto", lineHeight: 1.7 }}
      >
        {excerpt && (
          <p
            className="lead"
            style={{ fontSize: "17px", fontWeight: 500, marginBottom: "24px" }}
          >
            {excerpt}
          </p>
        )}

        {content ? (
          <div
            className="rich-content"
            style={{ fontSize: "15px" }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : <p>{isRTL ? "هذا المقال لا يحتوي على نص منشور بعد." : "This article does not have published body content yet."}</p>}

        <div
          style={{
            marginTop: "40px",
            borderTop: "1px solid var(--line)",
            paddingTop: "24px",
          }}
        >
          <Link className="smallprimary" href="/blog">
            {isRTL ? "← العودة إلى المدونة" : "← Back to Blog"}
          </Link>
        </div>
      </div>
    </main>
  );
}
