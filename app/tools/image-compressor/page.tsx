import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ImageCompressor from "@/components/tools/image/ImageCompressor";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/image-compressor" },
  title: "Image Compressor – Reduce Image Size Online",
  description:
    "Compress JPG, PNG and WebP images to a smaller file size while keeping quality. Free, processed locally in your browser.",
  keywords: [
    "ضغط الصور",
    "image compressor",
    "تصغير الصور",
    "تقليل حجم الصورة",
  ],
};

export default function ImageCompressorPage() {
  return (
    <ToolPageShell slug="image-compressor">
      <ImageCompressor />
    </ToolPageShell>
  );
}
