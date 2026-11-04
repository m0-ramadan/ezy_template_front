import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import CaseConverter from "@/components/tools/text/CaseConverter";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/case-converter" },
  title: "Case Converter – Change Text Case Online",
  description:
    "Convert text to UPPER CASE, lower case, title case or sentence case instantly in your browser. Free, private and no signup required.",
};

export default function CaseConverterPage() {
  return (
    <ToolPageShell slug="case-converter">
      <CaseConverter />
    </ToolPageShell>
  );
}
