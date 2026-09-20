import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import CaseConverter from "@/components/tools/text/CaseConverter";

export const metadata: Metadata = {
  title: "محول حالة الأحرف والنصوص | EzyTemplate",
  description:
    "تحويل حالة النص فوراً بين UPPERCASE و lowercase و Title Case و camelCase و snake_case.",
};

export default function CaseConverterPage() {
  return (
    <ToolPageShell slug="case-converter">
      <CaseConverter />
    </ToolPageShell>
  );
}
