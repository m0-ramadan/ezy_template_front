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

  useEffect(() => {
    getArticleBySlug(slug)
      .then(setArticle)
      .catch(() => {});
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

  const title =
    (isRTL
      ? article?.title_ar || article?.title
      : article?.title || article?.title_ar) ||
    (isRTL
      ? "أهم 10 اتجاهات حديثة في تصميم الويب لعام 2026"
      : "10 Modern Web Design Trends for 2026");
  const category = isRTL
    ? getArticleCatLabel(article?.category || "Web Design")
    : article?.category || "Web Design";
  const author = isRTL
    ? article?.author_name_ar || article?.author_name || "فريق إيزي تمبلت"
    : article?.author_name || "EzyTemplate Team";
  const readingTime = article?.reading_time || 8;
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
    (isRTL
      ? article?.excerpt_ar || article?.excerpt
      : article?.excerpt || article?.excerpt_ar) ||
    (isRTL
      ? "استكشف أحدث اتجاهات تصميم الويب التي ستتصدر المشهد في 2026."
      : "Explore the latest web design trends that will dominate in 2026.");

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
        {author} • {date} • {readingTime} {t("min_read")}
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
        ) : (
          <div>
            <h2>
              {isRTL ? "التصميم من أجل الوضوح والسهولة" : "Design for clarity"}
            </h2>
            <p>
              {isRTL
                ? "الهرمية البصرية الواضحة، المساحات البيضاء المريحة، وتصميم المكونات السهلة الوصول تساعد الزوار على فهم موقعك والتحويل بشكل أسرع."
                : "Strong hierarchy, generous whitespace, responsive systems and accessible components help visitors understand a product faster."}
            </p>
            <h2>
              {isRTL
                ? "البناء بأنظمة ومكونات قابلة لإعادة الاستخدام"
                : "Build with reusable systems"}
            </h2>
            <p>
              {isRTL
                ? "لغة التصميم المتسقة والمكونات الموحدة تجعل القوالب أسهل في التخصيص والصيانة عبر مختلف المشاريع."
                : "A consistent design language makes templates easier to customize and maintain across different projects."}
            </p>
            <h2>
              {isRTL
                ? "السرعة والأداء كجزء أساسي من التصميم"
                : "Make performance part of the design"}
            </h2>
            <p>
              {isRTL
                ? "الصفحات السريعة والأصول المضغوطة والتفاعلات المدروسة تصنع تجربة استثنائية على كافة الأجهزة."
                : "Fast pages, optimized assets and thoughtful interaction patterns create better experiences on every device."}
            </p>
          </div>
        )}

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
