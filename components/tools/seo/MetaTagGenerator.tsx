"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Tag, Copy, Check } from "lucide-react";
import { trackToolEvent } from "@/lib/api";

export default function MetaTagGenerator() {
  const { isRTL } = useLanguage();
  const [siteTitle, setSiteTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [copied, setCopied] = useState(false);

  trackToolEvent("meta-tag-generator", "use_tool");

  const metaHtml = `<!-- Primary Meta Tags -->
<title>${siteTitle || "Your Website Title"}</title>
<meta name="title" content="${siteTitle || "Your Website Title"}" />
<meta name="description" content="${description || "Your Website Description"}" />
<meta name="keywords" content="${keywords || "website, keywords"}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:title" content="${siteTitle || "Your Website Title"}" />
<meta property="og:description" content="${description || "Your Website Description"}" />

<!-- Twitter Card -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:title" content="${siteTitle || "Your Website Title"}" />
<meta property="twitter:description" content="${description || "Your Website Description"}" />`;

  const handleCopy = () => {
    navigator.clipboard.writeText(metaHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        background: "var(--card-bg, #ffffff)",
        border: "1px solid var(--line, #e2e8f0)",
        borderRadius: "20px",
        padding: "32px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "6px",
              }}
            >
              {isRTL ? "عنوان الصفحة (Meta Title):" : "Meta Title:"}
            </label>
            <input
              type="text"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              placeholder="EzyTemplate - Free Online Tools & Resources"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid var(--line)",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "6px",
              }}
            >
              {isRTL ? "وصف الصفحة (Meta Description):" : "Meta Description:"}
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Discover free online tools and high quality templates..."
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid var(--line)",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "6px",
              }}
            >
              {isRTL
                ? "الكلمات المفتاحية (Keywords):"
                : "Keywords (comma separated):"}
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="tools, pdf, excel, templates"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid var(--line)",
              }}
            />
          </div>
        </div>

        <div>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "6px",
            }}
          >
            {isRTL
              ? "كود الميتا تاج الناتِج (HTML Meta Code):"
              : "Generated HTML Meta Code:"}
          </label>
          <textarea
            readOnly
            value={metaHtml}
            rows={10}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid var(--line)",
              background: "var(--bg, #f8fafc)",
              fontFamily: "monospace",
              fontSize: "12.5px",
              marginBottom: "12px",
            }}
          />
          <button
            onClick={handleCopy}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              background: copied ? "#16a34a" : "var(--blue)",
              color: "#fff",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied
              ? isRTL
                ? "تم نسخ الكود!"
                : "Copied!"
              : isRTL
                ? "نسخ كود Meta Tags"
                : "Copy Meta Tags HTML"}
          </button>
        </div>
      </div>
    </div>
  );
}
