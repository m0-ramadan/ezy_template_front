import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ImageToPDF from "@/components/tools/pdf/ImageToPDF";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/image-to-pdf" },
  title: "Image to PDF Converter – Free Online",
  description:
    "Combine JPG and PNG images into a single PDF document directly in your browser.",
  keywords: ["تحويل الصور إلى pdf", "image to pdf", "jpg to pdf", "png to pdf"],
};

export default function ImageToPDFPage() {
  return (
    <ToolPageShell slug="image-to-pdf">
      <ImageToPDF />
    </ToolPageShell>
  );
}
