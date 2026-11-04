"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { NavGroup } from "@/lib/navigation";

export default function AppLayout({
  children,
  navGroups,
}: {
  children: React.ReactNode;
  navGroups?: NavGroup[];
}) {
  const pathname = usePathname();
  const isPreviewPage =
    pathname === "/preview" || pathname?.startsWith("/preview");

  if (isPreviewPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header navGroups={navGroups} />
      {children}
      <Footer />
    </>
  );
}
