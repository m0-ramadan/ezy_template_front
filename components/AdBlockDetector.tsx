"use client";

import { useEffect, useState, useCallback } from "react";
import { X, Info, ShieldAlert, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AdBlockDetector() {
  const { t, isRTL } = useLanguage();
  const [isAdBlockActive, setIsAdBlockActive] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const detectAdBlocker = useCallback(async (): Promise<boolean> => {
    // 1. Check URL debug query parameter for quick testing
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("adblock") === "1" || urlParams.get("test_adblock") === "true") {
        return true;
      }
    }

    // 2. DOM Bait Element Detection
    try {
      const bait = document.createElement("div");
      bait.setAttribute(
        "class",
        "adsbox pub_300x250 pub_300x250m pub_728x90 text-ad text_ad_links ad-banner banner-ad ad-placement ad-unit google-ad"
      );
      bait.setAttribute(
        "style",
        "width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;"
      );
      document.body.appendChild(bait);

      const isHidden =
        bait.offsetParent === null ||
        bait.offsetHeight === 0 ||
        bait.offsetLeft === 0 ||
        bait.offsetTop === 0 ||
        bait.offsetWidth === 0 ||
        bait.clientHeight === 0 ||
        bait.clientWidth === 0 ||
        window.getComputedStyle(bait).display === "none" ||
        window.getComputedStyle(bait).visibility === "hidden";

      document.body.removeChild(bait);

      if (isHidden) {
        return true;
      }
    } catch {
      // Ignore DOM errors
    }

    // 3. Network Fetch Probe
    try {
      const probeUrl = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      const res = await fetch(probeUrl, {
        method: "HEAD",
        mode: "no-cors",
        cache: "no-store",
      }).catch(() => null);

      if (!res) {
        return true;
      }
    } catch {
      return true;
    }

    return false;
  }, []);

  const runCheck = useCallback(async () => {
    // Check if dismissed in this browser session
    if (typeof window !== "undefined") {
      const dismissed = sessionStorage.getItem("ezy_adblock_dismissed");
      if (dismissed === "true") {
        return;
      }
    }

    const detected = await detectAdBlocker();
    setIsAdBlockActive(detected);
  }, [detectAdBlocker]);

  useEffect(() => {
    // Run initial check after page mount
    const timer = setTimeout(() => {
      runCheck();
    }, 1200);

    // Global hook for easy previewing
    if (typeof window !== "undefined") {
      (window as any).__showAdBlockModal = () => {
        setIsDismissed(false);
        setIsAdBlockActive(true);
      };
    }

    return () => clearTimeout(timer);
  }, [runCheck]);

  const handleDisabled = async () => {
    setIsChecking(true);
    const stillActive = await detectAdBlocker();
    setIsChecking(false);

    if (!stillActive) {
      setIsAdBlockActive(false);
      sessionStorage.removeItem("ezy_adblock_dismissed");
    } else {
      // Reload page to re-evaluate or notify
      window.location.reload();
    }
  };

  const handleContinue = () => {
    setIsDismissed(true);
    setIsAdBlockActive(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("ezy_adblock_dismissed", "true");
    }
  };

  if (!isAdBlockActive || isDismissed) {
    return null;
  }

  return (
    <div
      className="adblock-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="adblock-title"
    >
      <div className="adblock-modal">
        {/* Close Button */}
        <button
          onClick={handleContinue}
          className="adblock-close"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Central Glowing AdBlock Shield Graphic */}
        <div className="adblock-icon-wrap">
          <div className="adblock-rays" />
          <div className="adblock-icon-badge">
            <svg
              width="44"
              height="44"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4L40 10V22C40 32.5 33.2 42.1 24 45C14.8 42.1 8 32.5 8 22V10L24 4Z"
                stroke="#EF4444"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <text
                x="24"
                y="26"
                textAnchor="middle"
                fontSize="12"
                fontWeight="800"
                fill="#EF4444"
                fontFamily="system-ui, -apple-system, sans-serif"
                letterSpacing="0.5"
              >
                AD
              </text>
              <circle
                cx="24"
                cy="23"
                r="11"
                stroke="#EF4444"
                strokeWidth="2"
                fill="none"
              />
              <line
                x1="16"
                y1="15"
                x2="32"
                y2="31"
                stroke="#EF4444"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 id="adblock-title" className="adblock-title">
          {t("adblock_title")}
        </h2>

        {/* Description */}
        <p className="adblock-desc">
          {t("adblock_desc")}
        </p>

        {/* Info Box */}
        <div className="adblock-infobox">
          <Info size={18} className="adblock-info-icon" />
          <span>{t("adblock_tip")}</span>
        </div>

        {/* Action Buttons */}
        <div className="adblock-actions">
          <button
            onClick={handleDisabled}
            disabled={isChecking}
            className="adblock-btn-primary"
          >
            <ShieldCheck size={16} />
            <span>
              {isChecking
                ? (isRTL ? "جاري الفحص..." : "Checking...")
                : t("adblock_btn_disabled")}
            </span>
          </button>

          <button
            onClick={handleContinue}
            className="adblock-btn-secondary"
          >
            <span>{t("adblock_btn_continue")}</span>
          </button>
        </div>

        {/* Footer Note */}
        <div className="adblock-footer">
          {t("adblock_thank_you")}
        </div>
      </div>
    </div>
  );
}
