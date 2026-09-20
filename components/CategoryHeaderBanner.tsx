"use client";

import React from "react";
import { Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CategoryHeaderBannerProps {
  title: string;
  subtitle: string;
  type?:
    | "word"
    | "excel"
    | "canva"
    | "presentation"
    | "website"
    | "design"
    | "default";
  searchQuery: string;
  onSearchChange: (val: string) => void;
  placeholder?: string;
}

export default function CategoryHeaderBanner({
  title,
  subtitle,
  type = "default",
  searchQuery,
  onSearchChange,
  placeholder,
}: CategoryHeaderBannerProps) {
  const { isRTL } = useLanguage();

  // Dynamic colors, backgrounds, and badge icon text based on type
  const getCategoryTheme = () => {
    switch (type) {
      case "excel":
        return {
          bannerBg:
            "linear-gradient(135deg, #033827 0%, #086043 45%, #022419 100%)",
          boxShadow: "0 20px 50px rgba(3, 56, 39, 0.4)",
          accentGlow: "rgba(16, 185, 129, 0.45)",
          waveColor1: "#10b981",
          waveColor2: "#34d399",
          subtitleColor: "#a7f3d0",
          iconText: "X",
          iconBg: "linear-gradient(135deg, #107c41, #0b5a2e)",
          searchPlaceholder: isRTL
            ? "ابحث في قوالب إكسيل..."
            : "Search Excel templates...",
        };
      case "word":
        return {
          bannerBg:
            "linear-gradient(135deg, #0b1f48 0%, #153a8a 45%, #091738 100%)",
          boxShadow: "0 20px 50px rgba(11, 31, 72, 0.35)",
          accentGlow: "rgba(37, 99, 235, 0.45)",
          waveColor1: "#3b82f6",
          waveColor2: "#60a5fa",
          subtitleColor: "#bfdbfe",
          iconText: "W",
          iconBg: "linear-gradient(135deg, #106ebe, #005a9e)",
          searchPlaceholder: isRTL
            ? "ابحث في قوالب وورد..."
            : "Search Word templates...",
        };
      case "canva":
        return {
          bannerBg:
            "linear-gradient(135deg, #063d42 0%, #086b72 45%, #032528 100%)",
          boxShadow: "0 20px 50px rgba(6, 61, 66, 0.4)",
          accentGlow: "rgba(6, 182, 212, 0.45)",
          waveColor1: "#06b6d4",
          waveColor2: "#22d3ee",
          subtitleColor: "#cffafe",
          iconText: "C",
          iconBg: "linear-gradient(135deg, #7d2ae8, #00c4cc)",
          searchPlaceholder: isRTL
            ? "ابحث في قوالب كانفا..."
            : "Search Canva templates...",
        };
      case "presentation":
        return {
          bannerBg:
            "linear-gradient(135deg, #2e0854 0%, #581c87 45%, #1a0333 100%)",
          boxShadow: "0 20px 50px rgba(46, 8, 84, 0.4)",
          accentGlow: "rgba(168, 85, 247, 0.45)",
          waveColor1: "#a855f7",
          waveColor2: "#c084fc",
          subtitleColor: "#e9d5ff",
          iconText: "P",
          iconBg: "linear-gradient(135deg, #d24726, #a83318)",
          searchPlaceholder: isRTL
            ? "ابحث في العروض التقديمية..."
            : "Search Presentations...",
        };
      case "website":
        return {
          bannerBg:
            "linear-gradient(135deg, #1e1b4b 0%, #3730a3 45%, #110e38 100%)",
          boxShadow: "0 20px 50px rgba(30, 27, 75, 0.4)",
          accentGlow: "rgba(99, 102, 241, 0.45)",
          waveColor1: "#6366f1",
          waveColor2: "#818cf8",
          subtitleColor: "#c7d2fe",
          iconText: "</>",
          iconBg: "linear-gradient(135deg, #2563eb, #7c3aed)",
          searchPlaceholder: isRTL
            ? "ابحث في قوالب المواقع..."
            : "Search Web templates...",
        };
      case "design":
        return {
          bannerBg:
            "linear-gradient(135deg, #500724 0%, #831843 45%, #2a0313 100%)",
          boxShadow: "0 20px 50px rgba(80, 7, 36, 0.4)",
          accentGlow: "rgba(236, 72, 153, 0.45)",
          waveColor1: "#ec4899",
          waveColor2: "#f472b6",
          subtitleColor: "#fbcfe8",
          iconText: "Ps",
          iconBg: "linear-gradient(135deg, #ff007f, #7928ca)",
          searchPlaceholder: isRTL
            ? "ابحث في التصميمات..."
            : "Search Design templates...",
        };
      default:
        return {
          bannerBg:
            "linear-gradient(135deg, #0b1f48 0%, #153a8a 45%, #091738 100%)",
          boxShadow: "0 20px 50px rgba(11, 31, 72, 0.35)",
          accentGlow: "rgba(37, 99, 235, 0.45)",
          waveColor1: "#3b82f6",
          waveColor2: "#60a5fa",
          subtitleColor: "#cbd5e1",
          iconText: "★",
          iconBg: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          searchPlaceholder: isRTL
            ? "ابحث في جميع القوالب..."
            : "Search all templates...",
        };
    }
  };

  const theme = getCategoryTheme();
  const searchPh = placeholder || theme.searchPlaceholder;

  return (
    <div
      className="category-header-banner"
      suppressHydrationWarning
      style={{
        position: "relative",
        borderRadius: "24px",
        background: theme.bannerBg,
        boxShadow: theme.boxShadow,
        overflow: "hidden",
        padding: "44px 48px",
        margin: "24px 0 32px",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "230px",
        border: "1px solid rgba(255, 255, 255, 0.12)",
      }}
    >
      {/* Background Ambient Waves & Glowing Lights */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: 0.65,
        }}
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id={`waveGrad1_${type}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={theme.waveColor1} stopOpacity="0.45" />
            <stop
              offset="50%"
              stopColor={theme.waveColor2}
              stopOpacity="0.15"
            />
            <stop offset="100%" stopColor={theme.waveColor1} stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id={`waveGrad2_${type}`}
            x1="100%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor={theme.waveColor2} stopOpacity="0.35" />
            <stop offset="100%" stopColor={theme.waveColor1} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M-50 180 C 250 80, 500 280, 850 120 C 1050 30, 1250 160, 1300 200 L 1300 350 L -50 350 Z"
          fill={`url(#waveGrad1_${type})`}
        />
        <path
          d="M-100 120 C 200 240, 550 60, 900 220 C 1100 300, 1250 100, 1300 80 L 1300 350 L -100 350 Z"
          fill={`url(#waveGrad2_${type})`}
        />
        {/* Glow Particles */}
        <circle cx="120" cy="80" r="3" fill={theme.waveColor2} opacity="0.8" />
        <circle cx="480" cy="230" r="4" fill={theme.waveColor1} opacity="0.7" />
        <circle
          cx="920"
          cy="90"
          r="3"
          fill={theme.subtitleColor}
          opacity="0.9"
        />
        <circle
          cx="1080"
          cy="220"
          r="5"
          fill={theme.waveColor1}
          opacity="0.6"
        />
      </svg>

      {/* 3D Floating Documents Illustration (Left side in RTL, Right side in LTR) */}
      <div
        className="banner-illustration"
        style={{
          position: "relative",
          width: "320px",
          height: "180px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
          order: 2,
        }}
      >
        {/* Soft Radial Ambient Glow */}
        <div
          style={{
            position: "absolute",
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            background: theme.accentGlow,
            filter: "blur(40px)",
            opacity: 0.75,
          }}
        />

        {/* Back Card 1 (Slanted Left) */}
        <div
          style={{
            position: "absolute",
            width: "110px",
            height: "140px",
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            borderRadius: "12px",
            transform: "rotate(-16deg) translate(-75px, -10px)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "45px",
              background: "rgba(255,255,255,0.4)",
              borderRadius: "6px",
            }}
          />
          <div
            style={{
              width: "80%",
              height: "6px",
              background: "rgba(255,255,255,0.5)",
              borderRadius: "3px",
            }}
          />
          <div
            style={{
              width: "60%",
              height: "6px",
              background: "rgba(255,255,255,0.3)",
              borderRadius: "3px",
            }}
          />
          <div
            style={{
              width: "90%",
              height: "6px",
              background: "rgba(255,255,255,0.3)",
              borderRadius: "3px",
            }}
          />
        </div>

        {/* Back Card 2 (Slanted Right Top) */}
        <div
          style={{
            position: "absolute",
            width: "115px",
            height: "145px",
            background: "rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.45)",
            borderRadius: "12px",
            transform: "rotate(12deg) translate(65px, -25px)",
            boxShadow: "0 12px 28px rgba(0,0,0,0.3)",
            padding: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.5)",
              }}
            />
            <div
              style={{
                flex: 1,
                height: "6px",
                background: "rgba(255,255,255,0.6)",
                borderRadius: "3px",
              }}
            />
          </div>
          <div
            style={{
              width: "100%",
              height: "4px",
              background: "rgba(255,255,255,0.3)",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              width: "90%",
              height: "4px",
              background: "rgba(255,255,255,0.3)",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              width: "75%",
              height: "4px",
              background: "rgba(255,255,255,0.3)",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Back Card 3 (Slanted Right Bottom) */}
        <div
          style={{
            position: "absolute",
            width: "110px",
            height: "135px",
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.35)",
            borderRadius: "12px",
            transform: "rotate(8deg) translate(75px, 25px)",
            boxShadow: "0 10px 22px rgba(0,0,0,0.25)",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "12px",
              background: "rgba(255,255,255,0.4)",
              borderRadius: "3px",
            }}
          />
          <div
            style={{
              width: "100%",
              height: "12px",
              background: "rgba(255,255,255,0.3)",
              borderRadius: "3px",
            }}
          />
          <div
            style={{
              width: "100%",
              height: "12px",
              background: "rgba(255,255,255,0.3)",
              borderRadius: "3px",
            }}
          />
        </div>

        {/* FRONT MAIN 3D DOCUMENT SHEET */}
        <div
          style={{
            position: "relative",
            width: "135px",
            height: "165px",
            background: "#ffffff",
            borderRadius: "14px",
            boxShadow:
              "0 22px 45px rgba(0, 0, 0, 0.45), 0 0 20px rgba(255,255,255,0.25)",
            padding: "14px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            transform: "rotate(-4deg) translateY(-4px)",
            zIndex: 5,
            border: "1px solid rgba(255,255,255,0.8)",
          }}
        >
          {/* Folded Top Corner Decor */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "22px",
              height: "22px",
              background: "#cbd5e1",
              borderBottomLeftRadius: "8px",
              boxShadow: "-2px 2px 4px rgba(0,0,0,0.15)",
            }}
          />

          {/* App Badge Icon (W / X / P / C / etc) */}
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              background: theme.iconBg,
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: "20px",
              boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {theme.iconText}
          </div>

          {/* Content Wireframe Lines or Table Grid depending on type */}
          {type === "excel" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                marginTop: "4px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  background: "#107c41",
                  borderRadius: "2px",
                }}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "3px",
                }}
              >
                <div
                  style={{
                    height: "10px",
                    background: "#e2e8f0",
                    borderRadius: "1px",
                  }}
                />
                <div
                  style={{
                    height: "10px",
                    background: "#cbd5e1",
                    borderRadius: "1px",
                  }}
                />
                <div
                  style={{
                    height: "10px",
                    background: "#e2e8f0",
                    borderRadius: "1px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "3px",
                }}
              >
                <div
                  style={{
                    height: "10px",
                    background: "#f1f5f9",
                    borderRadius: "1px",
                  }}
                />
                <div
                  style={{
                    height: "10px",
                    background: "#e2e8f0",
                    borderRadius: "1px",
                  }}
                />
                <div
                  style={{
                    height: "10px",
                    background: "#f1f5f9",
                    borderRadius: "1px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "3px",
                }}
              >
                <div
                  style={{
                    height: "10px",
                    background: "#e2e8f0",
                    borderRadius: "1px",
                  }}
                />
                <div
                  style={{
                    height: "10px",
                    background: "#cbd5e1",
                    borderRadius: "1px",
                  }}
                />
                <div
                  style={{
                    height: "10px",
                    background: "#e2e8f0",
                    borderRadius: "1px",
                  }}
                />
              </div>
            </div>
          ) : type === "canva" || type === "design" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                marginTop: "2px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "40px",
                  background: "linear-gradient(135deg, #a21caf, #06b6d4)",
                  borderRadius: "6px",
                }}
              />
              <div
                style={{
                  width: "80%",
                  height: "5px",
                  background: "#334155",
                  borderRadius: "3px",
                }}
              />
              <div
                style={{
                  width: "50%",
                  height: "4px",
                  background: "#cbd5e1",
                  borderRadius: "2px",
                }}
              />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                marginTop: "2px",
              }}
            >
              <div
                style={{
                  width: "90%",
                  height: "7px",
                  background: "#334155",
                  borderRadius: "4px",
                }}
              />
              <div
                style={{
                  width: "70%",
                  height: "5px",
                  background: "#94a3b8",
                  borderRadius: "3px",
                }}
              />
              <div
                style={{
                  width: "100%",
                  height: "5px",
                  background: "#cbd5e1",
                  borderRadius: "3px",
                }}
              />
              <div
                style={{
                  width: "85%",
                  height: "5px",
                  background: "#e2e8f0",
                  borderRadius: "3px",
                }}
              />
              <div
                style={{
                  width: "60%",
                  height: "5px",
                  background: "#e2e8f0",
                  borderRadius: "3px",
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Text & Search Area (Right side in RTL, Left side in LTR) */}
      <div
        className="banner-text-content"
        suppressHydrationWarning
        style={{
          position: "relative",
          zIndex: 3,
          flex: 1,
          maxWidth: "600px",
          order: 1,
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 800,
            lineHeight: "1.25",
            marginBottom: "10px",
            color: "#ffffff",
            letterSpacing: "-0.5px",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontSize: "15px",
            lineHeight: "1.6",
            color: theme.subtitleColor,
            marginBottom: "24px",
            fontWeight: 500,
            opacity: 0.95,
          }}
        >
          {subtitle}
        </p>

        {/* White Pill Search Bar */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "520px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            className="banner-search-input"
            placeholder={searchPh}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            suppressHydrationWarning
          />
          <Search size={20} className="banner-search-icon" />
        </div>
      </div>
    </div>
  );
}
