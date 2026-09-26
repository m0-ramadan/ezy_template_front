"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface PageLoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export default function PageLoader({
  message,
  fullScreen = true,
}: PageLoaderProps) {
  const { isRTL } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`page-loader-wrapper ${fullScreen ? "fullscreen" : "inline"}`}
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        minHeight: "100vh",
        height: "100%",
        margin: 0,
        padding: 0,
        background: "var(--bg, #0b1120)",
        zIndex: 999999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        transition: "opacity 0.4s ease",
      }}
    >
      <div
        className="page-loader-content"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          margin: "auto",
          padding: 0,
          boxSizing: "border-box",
        }}
      >
        {/* Three Layer Animation */}
        <div
          className="three-layer-loader"
          style={{
            width: "50px",
            height: "50px",
            position: "relative",
            margin: "0 auto 24px auto",
          }}
        >
          <div
            className="layer layer-top"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "50px",
              height: "14px",
              background: "#2563eb",
              borderRadius: "4px",
              transform: "skewY(-28deg)",
              animation: "layerSeparateTop 1.2s infinite ease-in-out",
            }}
          />
          <div
            className="layer layer-middle"
            style={{
              position: "absolute",
              top: "16px",
              left: 0,
              width: "50px",
              height: "14px",
              background: "#3b82f6",
              borderRadius: "4px",
              transform: "skewY(-28deg)",
              animation: "layerSeparateMid 1.2s infinite ease-in-out",
            }}
          />
          <div
            className="layer layer-bottom"
            style={{
              position: "absolute",
              top: "32px",
              left: 0,
              width: "50px",
              height: "14px",
              background: "#7c3aed",
              borderRadius: "4px",
              transform: "skewY(-28deg)",
              animation: "layerSeparateBot 1.2s infinite ease-in-out",
            }}
          />
        </div>

        {/* Brand Image */}
        <div
          className="page-loader-brand"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/assets/logo.png"
            alt="EzyTemplate"
            className="logo-img light-only"
            style={{ height: "42px", width: "auto", display: "block" }}
          />
          <img
            src="/assets/logo-white.png"
            alt="EzyTemplate"
            className="logo-img dark-only"
            style={{ height: "42px", width: "auto", display: "block" }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes layerSeparateTop {
          0%,
          100% {
            transform: translateY(0) skewY(-28deg);
          }
          50% {
            transform: translateY(-12px) skewY(-28deg);
          }
        }
        @keyframes layerSeparateMid {
          0%,
          100% {
            transform: translateY(0) skewY(-28deg);
          }
          50% {
            transform: translateY(0) scaleX(1.1) skewY(-28deg);
          }
        }
        @keyframes layerSeparateBot {
          0%,
          100% {
            transform: translateY(0) skewY(-28deg);
          }
          50% {
            transform: translateY(12px) skewY(-28deg);
          }
        }
      `}</style>
    </div>
  );
}
