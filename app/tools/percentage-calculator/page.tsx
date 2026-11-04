import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import PercentageCalculator from "@/components/tools/calculator/PercentageCalculator";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/percentage-calculator" },
  title: "Percentage Calculator – Free Online",
  description:
    "Work out percentages, percentage change, increases and decreases with clear formulas and instant results.",
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
