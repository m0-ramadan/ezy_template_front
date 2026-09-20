import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import UUIDGenerator from "@/components/tools/developers/UUIDGenerator";

export const metadata: Metadata = {
  title: "مولد معرّفات UUID / GUID v4 | EzyTemplate",
  description:
    "توليد معرّفات عشوائية فريدة UUID v4 بالجملة لقواعد البيانات والتطبيقات أونلاين.",
};

export default function UUIDGeneratorPage() {
  return (
    <ToolPageShell slug="uuid-generator">
      <UUIDGenerator />
    </ToolPageShell>
  );
}
