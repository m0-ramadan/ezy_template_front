import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import PDFSplit from "@/components/tools/pdf/PDFSplit";

export const metadata: Metadata = {
  title: "تقسيم ملفات PDF مجاناً أونلاين | EzyTemplate",
  description:
    "فصل صفحات ملف PDF أو استخراج نطاق صفحات مخصص بسهولة مجاناً بدون تسجيل.",
  keywords: ["تقسيم pdf", "pdf split", "فصل صفحات pdf", "استخراج صفحات"],
};

export default function PDFSplitPage() {
  return (
    <ToolPageShell slug="pdf-split">
      <PDFSplit />
    </ToolPageShell>
  );
}
