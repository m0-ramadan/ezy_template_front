import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import DiscountCalculator from "@/components/tools/calculator/DiscountCalculator";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/discount-calculator" },
  title: "Discount Calculator – Sale Price and Savings",
  description:
    "Calculate sale prices, savings and discount percentages instantly with this free online discount calculator.",
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
