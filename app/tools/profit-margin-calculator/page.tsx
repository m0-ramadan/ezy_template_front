import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ProfitMarginCalculator from "@/components/tools/calculator/ProfitMarginCalculator";

export const metadata: Metadata = {
  title: "حاسبة هامش الربح مجاناً أونلاين | EzyTemplate",
  description:
    "حساب صافي الأرباح وهامش الربح المئوي ومعدل الزيادة على التكلفة (Markup) مجاناً بدون تسجيل.",
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
