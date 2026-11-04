import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ProfitMarginCalculator from "@/components/tools/calculator/ProfitMarginCalculator";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/profit-margin-calculator" },
  title: "Profit Margin Calculator – Cost and Price",
  description:
    "Calculate gross profit, margin and markup from cost and selling price instantly.",
  keywords: [
    "حاسبة هامش الربح",
    "profit margin calculator",
    "حساب الارباح",
    "markup",
  ],
};

export default function ProfitMarginCalculatorPage() {
  return (
    <ToolPageShell slug="profit-margin-calculator">
      <ProfitMarginCalculator />
    </ToolPageShell>
  );
}
