import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import UTMBuilder from "@/components/tools/seo/UTMBuilder";

export const metadata: Metadata = {
  title: "مولد روابط الحملات الإعلانية UTM | EzyTemplate",
  description:
    "إنشاء وبناء روابط تتبع الحملات التسويقية الإعلانية لـ Google Analytics وسوشيال ميديا.",
};

export default function UTMBuilderPage() {
  return (
    <ToolPageShell slug="utm-builder">
      <UTMBuilder />
    </ToolPageShell>
  );
}
