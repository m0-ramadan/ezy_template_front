import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import QuoteGenerator from "@/components/tools/business/QuoteGenerator";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/quote-generator" },
  title: "Quote Generator – Create Client Quotes",
  description:
    "Build professional quotes with line items, tax and totals, then download or print them.",
};

export default function QuoteGeneratorPage() {
  return (
    <ToolPageShell slug="quote-generator">
      <QuoteGenerator />
    </ToolPageShell>
  );
}
