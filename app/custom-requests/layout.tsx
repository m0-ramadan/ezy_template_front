import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Custom Template or Design",
  description:
    "Send a custom request for a template, workbook, deck or design that is not in the EzyTemplate catalogue, and get a scope and quote before any work begins.",
  alternates: { canonical: "/custom-requests" },
  openGraph: {
    title: "Request a Custom Template | EzyTemplate",
    description:
      "Ask for a template, workbook, deck or design that is not in the catalogue and get a scope and quote first.",
    url: `${SITE_URL}/custom-requests`,
    type: "website",
  },
};

export default function CustomRequestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
