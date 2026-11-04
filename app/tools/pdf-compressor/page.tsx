import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import PDFCompressor from "@/components/tools/pdf/PDFCompressor";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/pdf-compressor" },
  title: "PDF Compressor – Reduce PDF File Size",
  description:
    "Compress PDF files in your browser so they are easier to email and upload. Free and private.",
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
