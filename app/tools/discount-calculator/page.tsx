import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import DiscountCalculator from "@/components/tools/calculator/DiscountCalculator";

export const metadata: Metadata = {
  title: "حاسبة الخصومات والتخفيضات مجاناً أونلاين | EzyTemplate",
  description:
    "حساب السعر النهائي بعد الخصم ومقدار التوفير المالي بسهولة مجاناً بدون تسجيل.",
  keywords: [
    "حاسبة الخصومات",
    "discount calculator",
    "تخفيضات",
    "خصم المبيعات",
  ],
};

export default function DiscountCalculatorPage() {
  return (
    <ToolPageShell slug="discount-calculator">
      <DiscountCalculator />
    </ToolPageShell>
  );
}
