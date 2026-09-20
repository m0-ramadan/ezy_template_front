import { Metadata } from "next";
import { getToolBySlug } from "@/lib/toolsUtils";
import ToolBreadcrumb from "@/components/tools/ToolBreadcrumb";
import ToolFeaturesUsage from "@/components/tools/ToolFeaturesUsage";
import ToolFAQ from "@/components/tools/ToolFAQ";
import RelatedTools from "@/components/tools/RelatedTools";
import InvoiceGenerator from "@/components/tools/invoice/InvoiceGenerator";

export const metadata: Metadata = {
  title: "مولد فواتير مجاني أونلاين | EzyTemplate",
  description:
    "أنشئ فاتورة احترافية مجانًا واحسب الضريبة والخصومات وحمّل الفاتورة بصيغة PDF بدون تسجيل.",
  keywords: [
    "مولد فواتير",
    "فاتورة pdf",
    "فاتورة إلكترونية",
    "فاتورة ضريبية",
    "invoice generator",
  ],
};

export default function InvoiceToolPage() {
  const tool = getToolBySlug("invoice-generator");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "مولد الفواتير الاحترافي | EzyTemplate",
    url: "https://ezytemplate.com/tools/invoice-generator",
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
        <ToolBreadcrumb title={tool?.title.ar || "مولد الفواتير الاحترافي"} />

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

        {/* Interactive Application Tool */}
        <InvoiceGenerator />

        {/* Features & Usage */}
        <ToolFeaturesUsage
          features={tool?.features}
          usageSteps={tool?.usageSteps}
        />

        {/* FAQ Section */}
        <ToolFAQ faqs={tool?.faqs} />

        {/* Related Tools */}
        <RelatedTools currentSlug="invoice-generator" />
      </div>
    </div>
  );
}
