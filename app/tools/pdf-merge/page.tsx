import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import PDFMerge from "@/components/tools/pdf/PDFMerge";

export const metadata: Metadata = {
  title: "دمج ملفات PDF مجاناً أونلاين | EzyTemplate",
  description:
    "دمج وتجميع عدة ملفات PDF في مستند واحد مرتب بسلاسة وبشكل آمن مجاناً بدون تسجيل.",
  keywords: ["دمج pdf", "pdf merge", "تجميع pdf", "دمج مستندات"],
};

export default function PDFMergePage() {
  return (
    <ToolPageShell slug="pdf-merge">
      <PDFMerge />
    </ToolPageShell>
  );
}
