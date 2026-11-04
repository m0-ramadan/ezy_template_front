import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import UTMBuilder from "@/components/tools/seo/UTMBuilder";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/utm-builder" },
  title: "UTM Builder – Campaign Link Generator",
  description:
    "Build UTM-tagged campaign URLs so your analytics attribution stays clean and accurate.",
};

export default function UTMBuilderPage() {
  return (
    <ToolPageShell slug="utm-builder">
      <UTMBuilder />
    </ToolPageShell>
  );
}
