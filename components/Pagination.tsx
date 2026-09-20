"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const { isRTL } = useLanguage();

  if (totalPages <= 1) return null;

  // Generate page numbers array with ellipsis if needed
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        marginTop: "36px",
        flexWrap: "wrap",
      }}
    >
      {/* Previous Button */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          padding: "8px 14px",
          borderRadius: "10px",
          border: "1px solid var(--line, #e2e8f0)",
          background: "var(--card-bg, #ffffff)",
          color:
            currentPage === 1
              ? "var(--muted, #94a3b8)"
              : "var(--text, #0f172a)",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          fontSize: "13px",
          fontWeight: 600,
          opacity: currentPage === 1 ? 0.5 : 1,
          transition: "all 0.2s ease",
        }}
      >
        {isRTL ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        <span>{isRTL ? "السابق" : "Prev"}</span>
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => {
        if (typeof page === "string") {
          return (
            <span
              key={`dots-${index}`}
              style={{
                padding: "6px 10px",
                color: "var(--muted, #64748b)",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            style={{
              minWidth: "38px",
              height: "38px",
              padding: "0 10px",
              borderRadius: "10px",
              border: isActive ? "none" : "1px solid var(--line, #e2e8f0)",
              background: isActive
                ? "var(--blue, #2563eb)"
                : "var(--card-bg, #ffffff)",
              color: isActive ? "#ffffff" : "var(--text, #0f172a)",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: isActive ? 800 : 600,
              boxShadow: isActive
                ? "0 4px 12px rgba(37, 99, 235, 0.3)"
                : "none",
              transition: "all 0.2s ease",
            }}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          padding: "8px 14px",
          borderRadius: "10px",
          border: "1px solid var(--line, #e2e8f0)",
          background: "var(--card-bg, #ffffff)",
          color:
            currentPage === totalPages
              ? "var(--muted, #94a3b8)"
              : "var(--text, #0f172a)",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          fontSize: "13px",
          fontWeight: 600,
          opacity: currentPage === totalPages ? 0.5 : 1,
          transition: "all 0.2s ease",
        }}
      >
        <span>{isRTL ? "التالي" : "Next"}</span>
        {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    </div>
  );
}
