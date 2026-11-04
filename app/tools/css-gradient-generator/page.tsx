import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import CSSGradientGenerator from "@/components/tools/image/CSSGradientGenerator";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/css-gradient-generator" },
  title: "CSS Gradient Generator – Copy Ready CSS",
  description:
    "Design linear and radial CSS gradients visually and copy the generated CSS code straight into your stylesheet.",
};

export default function CSSGradientGeneratorPage() {
  return (
    <ToolPageShell slug="css-gradient-generator">
      <CSSGradientGenerator />
    </ToolPageShell>
  );
}
