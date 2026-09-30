import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support Centre - Download Help, File Formats and Contact",
  description:
    "Get help with EzyTemplate downloads: supported file formats, how to open and edit each template, common download problems and a direct way to reach the team.",
  alternates: { canonical: "/support" },
  openGraph: {
    title: "Support Centre | EzyTemplate",
    description:
      "Download help, supported file formats and a direct route to the EzyTemplate team.",
    url: `${SITE_URL}/support`,
    type: "website",
  },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
