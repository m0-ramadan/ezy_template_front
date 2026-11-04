import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import JSONFormatter from "@/components/tools/developers/JSONFormatter";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/json-formatter" },
  title: "JSON Formatter and Validator – Free Online",
  description:
    "Format, validate, beautify and minify JSON data with clear error messages. Runs entirely in your browser.",
};

export default function JSONFormatterPage() {
  return (
    <ToolPageShell slug="json-formatter">
      <JSONFormatter />
    </ToolPageShell>
  );
}
