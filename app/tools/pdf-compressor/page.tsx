import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import PDFCompressor from "@/components/tools/pdf/PDFCompressor";

export const metadata: Metadata = {
  title: "ضغط ملفات PDF مجانًا أونلاين | EzyTemplate",
  description:
    "قلل حجم ملفات PDF بسهولة وأمان مع الحفاظ على وضوح المستند وجودته مجاناً بدون تسجيل.",
  keywords: [
    "ضغط pdf",
    "pdf compressor",
    "تصغير حجم pdf",
    "تقليل حجم الملفات",
    "pdf مجاني",
  ],
};

export default function PDFCompressorPage() {
  return (
    <ToolPageShell slug="pdf-compressor">
      <PDFCompressor />
    </ToolPageShell>
  );
}
