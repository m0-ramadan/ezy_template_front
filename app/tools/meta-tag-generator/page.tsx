import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import MetaTagGenerator from "@/components/tools/seo/MetaTagGenerator";

export const metadata: Metadata = {
  title: "مولد الميتا تاج و OpenGraph لـ SEO | EzyTemplate",
  description:
    "إنشاء وتوليد وسوم الميتا تاج و OpenGraph و Twitter Cards لرفع ترتيب الموقع في جوجل.",
};

export default function MetaTagGeneratorPage() {
  return (
    <ToolPageShell slug="meta-tag-generator">
      <MetaTagGenerator />
    </ToolPageShell>
  );
}
