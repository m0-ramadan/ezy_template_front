import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import PDFSplit from "@/components/tools/pdf/PDFSplit";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/pdf-split" },
  title: "Split PDF Files – Extract Pages Online",
  description:
    "Split a PDF into separate documents or extract a page range in seconds.",
  keywords: ["تقسيم pdf", "pdf split", "فصل صفحات pdf", "استخراج صفحات"],
};

export default function PDFSplitPage() {
  return (
    <ToolPageShell slug="pdf-split">
      <PDFSplit />
    </ToolPageShell>
  );
}
