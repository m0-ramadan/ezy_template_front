"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { apiLogin } from "@/lib/api";
import { CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const { t, isRTL } = useLanguage();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(
    null,
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("ezy_auth_user");
      const token = localStorage.getItem("ezy_auth_token");
      if (user || token) {
        router.replace("/");
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await apiLogin({ email, password });
      if (res.ok) {
        setResult({
          ok: true,
          msg: isRTL
            ? "تم تسجيل الدخول بنجاح! جاري توجيهك..."
            : "Logged in successfully! Redirecting...",
        });
        if (typeof window !== "undefined") {
          localStorage.setItem("ezy_auth_token", res.token);
          localStorage.setItem("ezy_auth_user", JSON.stringify(res.user));
          window.dispatchEvent(new Event("ezy_auth_change"));
        }
        setTimeout(() => {
          router.push("/");
        }, 1200);
      } else {
        setResult({
          ok: false,
          msg:
            res.message ||
            (isRTL
              ? "فشل تسجيل الدخول. تحقق من البريد وكلمة المرور."
              : "Login failed. Check your credentials."),
        });
      }
    } catch {
      setResult({
        ok: false,
        msg: isRTL
          ? "تعذر الاتصال بالسيرفر. يرجى المحاولة مرة أخرى."
          : "Network error. Please try again.",
      });
    }
    setLoading(false);
  };

  return (
    <main className="auth">
      <div className="auth-card">
        <div
          className="auth-logo"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Link href="/">
            <img
              src="/assets/logo.png"
              alt="EzyTemplate"
              className="logo-img light-only"
              style={{ height: "46px", margin: "0 auto" }}
            />
            <img
              src="/assets/logo-white.png"
              alt="EzyTemplate"
              className="logo-img dark-only"
              style={{ height: "46px", margin: "0 auto" }}
            />
          </Link>
        </div>
        <h1>{t("login_title")}</h1>
        <p className="lead">{t("login_subtitle")}</p>

        {result && (
          <div
            style={{
              padding: "12px 14px",
              borderRadius: "9px",
              marginTop: "14px",
              fontSize: "12px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: result.ok ? "#ecfdf5" : "#fef2f2",
              color: result.ok ? "#065f46" : "#991b1b",
              border: `1px solid ${result.ok ? "#a7f3d0" : "#fecaca"}`,
            }}
          >
            {result.ok ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{result.msg}</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginTop: "16px",
          }}
        >
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            {t("login_email_label")}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="input"
              style={{ height: "42px", borderRadius: "9px" }}
            />
          </label>

          <label
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            {t("login_password_label")}
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="input"
                style={{
                  height: "42px",
                  borderRadius: "9px",
                  width: "100%",
                  paddingRight: isRTL ? "12px" : "40px",
                  paddingLeft: isRTL ? "40px" : "12px",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                style={{
                  position: "absolute",
                  right: isRTL ? "auto" : "12px",
                  left: isRTL ? "12px" : "auto",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748b",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "4px",
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="smallprimary"
            style={{
              width: "100%",
              height: "42px",
              marginTop: "6px",
              fontSize: "12px",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? isRTL
                ? "جاري تسجيل الدخول..."
                : "Logging in..."
              : t("login_btn")}
          </button>
        </form>

        <p
          className="auth-foot"
          style={{ marginTop: "18px", fontSize: "11px", color: "var(--muted)" }}
        >
          {t("login_no_account")}{" "}
          <Link
            href="/signup"
            style={{ color: "var(--blue)", fontWeight: 700 }}
          >
            {t("login_create_one")}
          </Link>
        </p>
      </div>
    </main>
  );
}
