"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAssetUrl } from "@/lib/api";

interface TemplateGalleryProps {
  title: string;
  mainImage: string;
  screenshots: string[];
}

export default function TemplateGallery({
  title,
  mainImage,
  screenshots = [],
}: TemplateGalleryProps) {
  const defaultFallback = "/assets/travelix-card.png";

  // Format and deduplicate all images
  const rawList = [mainImage, ...screenshots].filter(Boolean);
  const formattedList = rawList.map((img) => getAssetUrl(img));
  const allImages = Array.from(new Set(formattedList));

  if (allImages.length === 0) {
    allImages.push(defaultFallback);
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const currentImage = imageErrors[activeIndex]
    ? defaultFallback
    : allImages[activeIndex] || defaultFallback;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
  };

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className="template-gallery-wrapper">
      {/* Main Preview Container */}
      <div
        className="main-preview"
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "240px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--card-bg, #ffffff)",
        }}
      >
        <img
          src={currentImage}
          alt={`${title} - Preview ${activeIndex + 1}`}
          onError={() => handleImageError(activeIndex)}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "540px",
            objectFit: "contain",
            borderRadius: "9px",
            display: "block",
            transition: "opacity 0.2s ease-in-out",
          }}
        />

        {/* Carousel Navigation Arrows if multiple images */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="preview-arrow left"
              aria-label="Previous image"
              type="button"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="preview-arrow right"
              aria-label="Next image"
              type="button"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Image Counter Badge */}
        {allImages.length > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              right: "12px",
              background: "rgba(15, 23, 42, 0.75)",
              backdropFilter: "blur(4px)",
              color: "#fff",
              padding: "4px 10px",
              borderRadius: "20px",
              fontSize: "11px",
              fontWeight: 600,
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            {activeIndex + 1} / {allImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails Strip */}
      {allImages.length > 1 && (
        <div
          className="thumb-strip"
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "12px",
            overflowX: "auto",
            paddingBottom: "6px",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {allImages.map((img, idx) => {
            const thumbSrc = imageErrors[idx] ? defaultFallback : img;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  outline: "none",
                  flexShrink: 0,
                }}
              >
                <img
                  src={thumbSrc}
                  alt={`${title} thumbnail ${idx + 1}`}
                  onError={() => handleImageError(idx)}
                  style={{
                    width: "88px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border:
                      activeIndex === idx
                        ? "2px solid #2563eb"
                        : "1px solid #e2e8f0",
                    opacity: activeIndex === idx ? 1 : 0.75,
                    transition: "all 0.15s ease",
                  }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
