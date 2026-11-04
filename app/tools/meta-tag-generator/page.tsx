import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import MetaTagGenerator from "@/components/tools/seo/MetaTagGenerator";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/meta-tag-generator" },
  title: "Meta Tag Generator – SEO and Open Graph",
  description:
    "Generate complete SEO meta tags, Open Graph and Twitter card markup for any web page.",
};

export default function MetaTagGeneratorPage() {
  return (
    <ToolPageShell slug="meta-tag-generator">
      <MetaTagGenerator />
    </ToolPageShell>
  );
}
