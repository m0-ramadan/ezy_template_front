import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import PDFMerge from "@/components/tools/pdf/PDFMerge";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/pdf-merge" },
  title: "Merge PDF Files – Combine PDFs Online",
  description:
    "Combine multiple PDF documents into a single file in the order you choose. Free and no signup.",
  keywords: ["دمج pdf", "pdf merge", "تجميع pdf", "دمج مستندات"],
};

export default function PDFMergePage() {
  return (
    <ToolPageShell slug="pdf-merge">
      <PDFMerge />
    </ToolPageShell>
  );
}
