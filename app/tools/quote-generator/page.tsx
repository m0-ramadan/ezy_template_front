import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import QuoteGenerator from "@/components/tools/business/QuoteGenerator";

export const metadata: Metadata = {
  title: "مولد عروض الأسعار والتقديرات | EzyTemplate",
  description:
    "إنشاء وتحميل عروض الأسعار التجارية والتقديرات المالية للعملاء بصيغة PDF فوراً.",
};

export default function QuoteGeneratorPage() {
  return (
    <ToolPageShell slug="quote-generator">
      <QuoteGenerator />
    </ToolPageShell>
  );
}
