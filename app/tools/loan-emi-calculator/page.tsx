import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import LoanEMICalculator from "@/components/tools/calculators/LoanEMICalculator";

export const metadata: Metadata = {
  title: "حاسبة القروض والقسط الشهري (EMI) | EzyTemplate",
  description:
    "حساب القسط الشهري للقروض والتمويل العقاري والشخصي وإجمالي الفوائد المستحقة مع جدول السداد.",
};

export default function LoanEMICalculatorPage() {
  return (
    <ToolPageShell slug="loan-emi-calculator">
      <LoanEMICalculator />
    </ToolPageShell>
  );
}
