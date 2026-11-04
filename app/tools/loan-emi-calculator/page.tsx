import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import LoanEMICalculator from "@/components/tools/calculators/LoanEMICalculator";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/loan-emi-calculator" },
  title: "Loan EMI Calculator – Monthly Instalment",
  description:
    "Calculate monthly loan instalments, total interest and the complete repayment schedule for any loan amount.",
};

export default function LoanEMICalculatorPage() {
  return (
    <ToolPageShell slug="loan-emi-calculator">
      <LoanEMICalculator />
    </ToolPageShell>
  );
}
