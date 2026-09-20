import { Metadata } from "next";
import { getToolBySlug } from "@/lib/toolsUtils";
import ToolBreadcrumb from "@/components/tools/ToolBreadcrumb";
import ToolFeaturesUsage from "@/components/tools/ToolFeaturesUsage";
import ToolFAQ from "@/components/tools/ToolFAQ";
import RelatedTools from "@/components/tools/RelatedTools";
import VATCalculator from "@/components/tools/vat/VATCalculator";

export const metadata: Metadata = {
  title: "حاسبة ضريبة القيمة المضافة VAT مجانًا | EzyTemplate",
  description:
    "احسب ضريبة القيمة المضافة بسرعة، إضافة الضريبة أو استخراجها من المبلغ الإجمالي بدقة عالية.",
  keywords: [
    "حاسبة الضريبة",
    "vat calculator",
    "ضريبة القيمة المضافة",
    "حساب 14%",
    "استخراج الضريبة",
  ],
};

export default function VATToolPage() {
  const tool = getToolBySlug("vat-calculator");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "حاسبة ضريبة القيمة المضافة VAT | EzyTemplate",
    url: "https://ezytemplate.com/tools/vat-calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div
      style={{
        background: "var(--bg)",
        minHeight: "80vh",
        padding: "32px 0 80px",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container">
        <ToolBreadcrumb
          title={tool?.title.ar || "حاسبة ضريبة القيمة المضافة"}
        />

        {/* Tool Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: 800,
              color: "var(--text)",
              marginBottom: "12px",
            }}
          >
            {tool?.title.ar}
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "var(--muted)",
              maxWidth: "800px",
              lineHeight: 1.6,
            }}
          >
            {tool?.description.ar}
          </p>
        </div>

        {/* Interactive Tool */}
        <VATCalculator />

        {/* Features & Usage */}
        <ToolFeaturesUsage
          features={tool?.features}
          usageSteps={tool?.usageSteps}
        />

        {/* FAQ Section */}
        <ToolFAQ faqs={tool?.faqs} />

        {/* Related Tools */}
        <RelatedTools currentSlug="vat-calculator" />
      </div>
    </div>
  );
}
