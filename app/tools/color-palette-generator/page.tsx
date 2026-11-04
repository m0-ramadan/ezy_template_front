import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ColorPaletteGenerator from "@/components/tools/image/ColorPaletteGenerator";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/color-palette-generator" },
  title: "Color Palette Generator – Build Palettes Online",
  description:
    "Generate harmonious colour palettes and copy HEX codes for your designs. A free browser tool with no signup.",
  keywords: [
    "لوحات ألوان",
    "color palette generator",
    "استخراج الألوان",
    "كود الهيكس",
  ],
};

export default function ColorPaletteGeneratorPage() {
  return (
    <ToolPageShell slug="color-palette-generator">
      <ColorPaletteGenerator />
    </ToolPageShell>
  );
}
