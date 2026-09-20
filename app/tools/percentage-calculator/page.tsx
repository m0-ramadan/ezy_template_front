import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import PercentageCalculator from "@/components/tools/calculator/PercentageCalculator";

export const metadata: Metadata = {
  title: "حاسبة النسبة المئوية مجاناً أونلاين | EzyTemplate",
  description:
    "حساب النسب المئوية، نسبة الزيادة أو النقصان ومقارنة القيم المئوية بسهولة مجاناً بدون تسجيل.",
  keywords: [
    "حاسبة النسبة المئوية",
    "percentage calculator",
    "حساب النسب",
    "مئوية",
  ],
};

export default function PercentageCalculatorPage() {
  return (
    <ToolPageShell slug="percentage-calculator">
      <PercentageCalculator />
    </ToolPageShell>
  );
}
