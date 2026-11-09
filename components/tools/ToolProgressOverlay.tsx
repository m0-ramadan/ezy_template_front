"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Full-screen progress overlay for tool actions (convert, compress, merge,
 * split, generate...). Tool work happens in the browser in a few hundred
 * milliseconds, so the bar is time-based: it eases towards 90% while the
 * action runs, snaps to 100% when it finishes, and always stays visible long
 * enough for the user to see it complete.
 */
export default function ToolProgressOverlay({
  active,
  label,
  doneLabel,
}: {
  active: boolean;
  label?: string;
  doneLabel?: string;
}) {
  const { isRTL } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const startedAt = useRef(0);
  const current = useRef(0);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const finish = useRef<ReturnType<typeof setInterval> | null>(null);
  const hide = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setValue = (value: number) => {
    current.current = value;
    setProgress(value);
  };

  useEffect(() => {
    const clearAll = () => {
      if (tick.current) clearInterval(tick.current);
      if (finish.current) clearInterval(finish.current);
      if (hide.current) clearTimeout(hide.current);
      tick.current = null;
      finish.current = null;
      hide.current = null;
    };

    if (active) {
      clearAll();
      startedAt.current = Date.now();
      setDone(false);
      setValue(2);
      setVisible(true);
      tick.current = setInterval(() => {
        const p = current.current;
        if (p >= 90) return;
        // Ease towards 90% with a decreasing step so the bar never stalls.
        setValue(p + (p < 40 ? 8 : p < 70 ? 4 : 1.2));
      }, 140);
    } else if (visible) {
      if (tick.current) clearInterval(tick.current);
      tick.current = null;

      // Fill the remaining distance to 100% smoothly. Even an action that
      // finished instantly gets a short, visible animation.
      const elapsed = Date.now() - startedAt.current;
      const duration = Math.max(450, 900 - elapsed);
      const from = current.current;
      const started = Date.now();

      finish.current = setInterval(() => {
        const t = Math.min(1, (Date.now() - started) / duration);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(from + (100 - from) * eased);
        if (t >= 1) {
          if (finish.current) clearInterval(finish.current);
          finish.current = null;
          setDone(true);
          hide.current = setTimeout(() => {
            setVisible(false);
            setValue(0);
            setDone(false);
          }, 550);
        }
      }, 30);
    }

    return () => {
      if (tick.current) clearInterval(tick.current);
    };
    // `visible` is intentionally excluded: it is derived from `active`, and
    // including it would restart the finish animation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  if (!visible) return null;

  // Show 99% until the action has actually finished, so "100%" and the
  // success check always appear together.
  const percent = done ? 100 : Math.min(99, Math.round(progress));
  const message = done
    ? doneLabel || (isRTL ? "تم بنجاح" : "Completed")
    : label || (isRTL ? "جارٍ المعالجة…" : "Processing…");

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={!done}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "rgba(15, 23, 42, 0.55)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      <div
        style={{
          width: "min(380px, 100%)",
          background: "var(--card-bg, #ffffff)",
          color: "var(--text, #0f172a)",
          border: "1px solid var(--line, #e2e8f0)",
          borderRadius: "18px",
          padding: "28px 24px 24px",
          boxShadow: "0 24px 60px -20px rgba(15, 23, 42, 0.55)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "56px",
            height: "56px",
            margin: "0 auto 14px",
            borderRadius: "50%",
            background: done
              ? "rgba(16, 185, 129, 0.14)"
              : "rgba(37, 99, 235, 0.12)",
            color: done ? "#10b981" : "#2563eb",
          }}
        >
          {done ? (
            <Check size={28} strokeWidth={3} />
          ) : (
            <Loader2 className="animate-spin" size={28} />
          )}
        </div>

        <div
          style={{
            fontSize: "30px",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            background: done
              ? "linear-gradient(90deg,#10b981,#059669)"
              : "linear-gradient(90deg,#2563eb,#7c3aed)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {percent}%
        </div>

        <p
          style={{
            margin: "10px 0 16px",
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--muted, #475569)",
            minHeight: "20px",
          }}
        >
          {message}
        </p>

        <div
          style={{
            height: "10px",
            width: "100%",
            borderRadius: "999px",
            background: "var(--bg, #eef2f7)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${percent}%`,
              borderRadius: "999px",
              background: done
                ? "linear-gradient(90deg,#10b981,#059669)"
                : "linear-gradient(90deg,#2563eb,#7c3aed)",
              transition: "width 180ms ease-out, background 200ms ease",
            }}
          />
        </div>
      </div>
    </div>
  );
}
