import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import JSONFormatter from "@/components/tools/developers/JSONFormatter";

export const metadata: Metadata = {
  title: "منسق وفاحص ملفات JSON | EzyTemplate",
  description:
    "تنسيق وتجميل وضغط كود JSON واكتشاف أخطاء القواعد والسطر فوراً أونلاين.",
};

export default function JSONFormatterPage() {
  return (
    <ToolPageShell slug="json-formatter">
      <JSONFormatter />
    </ToolPageShell>
  );
}
