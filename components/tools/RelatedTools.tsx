"use client";

import { useLanguage } from "@/context/LanguageContext";
import ToolCard from "./ToolCard";
import { getRelatedTools } from "@/lib/toolsUtils";

export default function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const { isRTL } = useLanguage();
  const related = getRelatedTools(currentSlug, 3);

  if (related.length === 0) return null;

  return (
    <section style={{ marginTop: "56px" }}>
      <h2
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: "var(--text)",
          marginBottom: "20px",
        }}
      >
        {isRTL ? "أدوات أخرى قد تحتاجها" : "Other Tools You Might Need"}
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {related.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}
