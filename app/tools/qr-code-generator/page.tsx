import { Metadata } from "next";
import { getToolBySlug } from "@/lib/toolsUtils";
import ToolBreadcrumb from "@/components/tools/ToolBreadcrumb";
import ToolFeaturesUsage from "@/components/tools/ToolFeaturesUsage";
import ToolFAQ from "@/components/tools/ToolFAQ";
import RelatedTools from "@/components/tools/RelatedTools";
import QRGenerator from "@/components/tools/qr/QRGenerator";

export const metadata: Metadata = {
  title: "مولد QR Code مجاني أونلاين | EzyTemplate",
  description:
    "أنشئ رموز QR مخصصة للمواقع، الشبكات، والاتصالات بجودة عالية وحمّلها بصيغة PNG أو SVG بدون تسجيل.",
  keywords: [
    "مولد qr",
    "qr code generator",
    "رمز qr",
    "باركود مجاني",
    "انشاء qr code",
  ],
};

export default function QRToolPage() {
  const tool = getToolBySlug("qr-code-generator");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "مولد الرموز QR Code | EzyTemplate",
    url: "https://ezytemplate.com/tools/qr-code-generator",
    applicationCategory: "UtilitiesApplication",
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
        <ToolBreadcrumb title={tool?.title.ar || "مولد الرموز QR Code"} />

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
        <QRGenerator />

        {/* Features & Usage */}
        <ToolFeaturesUsage
          features={tool?.features}
          usageSteps={tool?.usageSteps}
        />

        {/* FAQ Section */}
        <ToolFAQ faqs={tool?.faqs} />

        {/* Related Tools */}
        <RelatedTools currentSlug="qr-code-generator" />
      </div>
    </div>
  );
}
