import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ImageConverter from "@/components/tools/image/ImageConverter";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/image-converter" },
  title: "Image Converter – JPG, PNG and WebP",
  description:
    "Convert images between JPG, PNG and WebP formats instantly in your browser, with no upload.",
};

export default function ImageConverterPage() {
  return (
    <ToolPageShell slug="image-converter">
      <ImageConverter />
    </ToolPageShell>
  );
}
