import { cookies } from "next/headers";
import "./globals.css";
import AppLayout from "@/components/AppLayout";
import { LanguageProvider } from "@/context/LanguageContext";
import { Locale } from "@/lib/translations";

export const metadata = {
  title: "EzyTemplate — Free & Premium Website Templates",
  description:
    "Beautiful website templates, UI kits and resources by Ezystore.",
  icons: {
    icon: "/assets/logo-icon.png",
    shortcut: "/assets/logo-icon.png",
    apple: "/assets/logo-icon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let initialLocale: Locale = "en";
  try {
    const cookieStore = await cookies();
    const saved = cookieStore.get("ezylang")?.value;
    if (saved === "ar" || saved === "en") {
      initialLocale = saved as Locale;
    }
  } catch {
    // fallback to English
  }

  const isRTL = initialLocale === "ar";

  return (
    <html
      lang={initialLocale}
      dir={isRTL ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1622689578222320"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // Language
                var match = document.cookie.match(new RegExp('(^| )ezylang=([^;]+)'));
                var cLang = match ? match[2] : null;
                var lLang = localStorage.getItem('ezylang');
                var lang = cLang || lLang || 'en';
                document.documentElement.lang = lang;
                document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
                if (!cLang) {
                  document.cookie = 'ezylang=' + lang + '; path=/; max-age=31536000; SameSite=Lax';
                }

                // System Dark / Light Theme
                var savedTheme = localStorage.getItem('ezytheme');
                var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                var isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
                if (isDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body>
        <LanguageProvider initialLocale={initialLocale}>
          <AppLayout>{children}</AppLayout>
        </LanguageProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              requestAnimationFrame(() => document.documentElement.classList.add('theme-ready'));
            `,
          }}
        />
      </body>
    </html>
  );
}
