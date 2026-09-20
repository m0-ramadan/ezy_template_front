"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getCustomPageContent } from "@/lib/api";
import PageLoader from "@/components/PageLoader";

interface FaqItem {
  question: string;
  question_ar?: string;
  answer: string;
  answer_ar?: string;
  category?: string;
}

interface FaqPageData {
  title?: string;
  title_ar?: string;
  subtitle?: string;
  subtitle_ar?: string;
  items?: FaqItem[];
}

export default function FaqPage() {
  const { isRTL } = useLanguage();
  const [data, setData] = useState<FaqPageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  useEffect(() => {
    let isMounted = true;
    getCustomPageContent("faq")
      .then((res) => {
        if (isMounted) {
          setData(res);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
  }, []);

  const items = useMemo(() => data?.items || [], [data]);

  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(items.map((item) => item.category || "General")),
    );
    return ["All", ...cats];
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const q = isRTL
        ? item.question_ar || item.question
        : item.question || item.question_ar;
      const a = isRTL
        ? item.answer_ar || item.answer
        : item.answer || item.answer_ar;
      const matchesSearch =
        q?.toLowerCase().includes(search.toLowerCase()) ||
        a?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" ||
        (item.category || "General") === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [items, search, selectedCategory, isRTL]);

  const toggleItem = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  if (loading) return <PageLoader />;

  const title = isRTL
    ? data?.title_ar || "الأسئلة الشائعة"
    : data?.title || "Frequently Asked Questions";
  const subtitle = isRTL
    ? data?.subtitle_ar ||
      "إجابات شاملة لكل الأسئلة الشائعة حول القوالب والخدمات."
    : data?.subtitle ||
      "Find quick answers to common questions about our templates and services.";

  return (
    <div style={{ minHeight: "85vh", padding: "40px 16px 80px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* HERO SECTION */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "50px",
              background: "rgba(99, 102, 241, 0.15)",
              color: "#818cf8",
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            <HelpCircle size={16} />
            <span>{isRTL ? "مركز المساعدة" : "Help Center"}</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 800,
              marginBottom: "16px",
              color: "var(--text)",
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "var(--muted)",
              maxWidth: "600px",
              margin: "0 auto 32px",
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>

          {/* SEARCH BAR */}
          <div
            style={{
              position: "relative",
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            <Search
              size={20}
              style={{
                position: "absolute",
                [isRTL ? "right" : "left"]: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--muted)",
              }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                isRTL
                  ? "ابحث في الأسئلة والحلول..."
                  : "Search questions, answers, topics..."
              }
              style={{
                width: "100%",
                padding: isRTL ? "14px 48px 14px 16px" : "14px 16px 14px 48px",
                fontSize: "15px",
                borderRadius: "14px",
                border: "1px solid var(--line)",
                background: "var(--card-bg)",
                color: "var(--text)",
                outline: "none",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
              }}
            />
          </div>
        </div>

        {/* CATEGORY TAGS */}
        {categories.length > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "36px",
            }}
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "8px 20px",
                    borderRadius: "20px",
                    fontSize: "14px",
                    fontWeight: 600,
                    border: isActive
                      ? "1px solid #6366f1"
                      : "1px solid var(--line)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    background: isActive ? "#6366f1" : "var(--card-bg)",
                    color: isActive ? "#ffffff" : "var(--muted)",
                  }}
                >
                  {cat === "All" ? (isRTL ? "الكل" : "All") : cat}
                </button>
              );
            })}
          </div>
        )}

        {/* ACCORDION LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {filteredItems.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "48px 20px",
                background: "var(--card-bg)",
                borderRadius: "16px",
                border: "1px dashed var(--line)",
              }}
            >
              <HelpCircle
                size={40}
                style={{ color: "var(--muted)", marginBottom: "12px" }}
              />
              <p style={{ fontSize: "16px", color: "var(--muted)" }}>
                {isRTL
                  ? "لم يتم العثور على نتائج مطابقة لبحثك."
                  : "No questions matched your search query."}
              </p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isOpen = openIndices.includes(idx);
              const qText = isRTL
                ? item.question_ar || item.question
                : item.question || item.question_ar;
              const aText = isRTL
                ? item.answer_ar || item.answer
                : item.answer || item.answer_ar;

              return (
                <div
                  key={idx}
                  style={{
                    background: "var(--card-bg)",
                    borderRadius: "16px",
                    border: "1px solid var(--line)",
                    overflow: "hidden",
                    transition: "all 0.2s ease",
                  }}
                >
                  <button
                    onClick={() => toggleItem(idx)}
                    style={{
                      width: "100%",
                      padding: "20px 24px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "16px",
                      background: "none",
                      border: "none",
                      textAlign: isRTL ? "right" : "left",
                      cursor: "pointer",
                      fontWeight: 700,
                      fontSize: "16px",
                      color: isOpen ? "#818cf8" : "var(--text)",
                    }}
                  >
                    <span>{qText}</span>
                    {isOpen ? (
                      <ChevronUp size={20} style={{ color: "#818cf8" }} />
                    ) : (
                      <ChevronDown
                        size={20}
                        style={{ color: "var(--muted)" }}
                      />
                    )}
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: "0 24px 20px",
                        fontSize: "15px",
                        lineHeight: 1.7,
                        color: "var(--muted)",
                        borderTop: "1px solid var(--line)",
                        paddingTop: "16px",
                      }}
                    >
                      {aText}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* STILL HAVE QUESTIONS CTA */}
        <div
          style={{
            marginTop: "60px",
            padding: "32px",
            borderRadius: "20px",
            background: "var(--card-bg)",
            border: "1px solid var(--line)",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 700,
                marginBottom: "6px",
                color: "var(--text)",
              }}
            >
              {isRTL ? "هل لديك سؤال لم تجد إجابته؟" : "Still have questions?"}
            </h3>
            <p style={{ fontSize: "14px", color: "var(--muted)" }}>
              {isRTL
                ? "فريق الدعم الفني جاهز لمساعدتك في أي وقت."
                : "Our support team is always ready to assist you."}
            </p>
          </div>
          <Link
            href="/contact"
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
            <MessageSquare size={18} />
            <span>{isRTL ? "تواصل معنا" : "Contact Support"}</span>
            {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          </Link>
        </div>
      </div>
    </div>
  );
}
