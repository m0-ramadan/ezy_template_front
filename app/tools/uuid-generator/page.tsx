import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import UUIDGenerator from "@/components/tools/developers/UUIDGenerator";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/uuid-generator" },
  title: "UUID Generator – v4 GUIDs Online",
  description:
    "Generate random RFC 4122 version 4 UUIDs in bulk for databases, APIs and test fixtures.",
};

export default function UUIDGeneratorPage() {
  return (
    <ToolPageShell slug="uuid-generator">
      <UUIDGenerator />
    </ToolPageShell>
  );
}
