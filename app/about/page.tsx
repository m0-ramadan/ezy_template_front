"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  Download,
  Users,
  Star,
  Globe,
  Target,
  Eye,
  Heart,
  FileCode2,
} from "lucide-react";
import { getAboutContent, getRealtimeStats, getAssetUrl } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";
import PageLoader from "@/components/PageLoader";

const iconMap: Record<string, any> = {
  Download,
  Users,
  Star,
  Globe,
  Target,
  Eye,
  Heart,
  FileCode2,
};

export default function About() {
  const { t, isRTL } = useLanguage();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [realtime, setRealtime] = useState<{
    downloads?: number;
    visits?: number;
    templates?: number;
    rating?: number;
  } | null>(null);

  useEffect(() => {
    let isMounted = true;
    getAboutContent()
      .then((res) => {
        if (isMounted && res) {
          setData(res);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    const fetchLiveStats = () => {
      getRealtimeStats()
        .then((res) => {
          if (isMounted && res) setRealtime(res);
        })
        .catch(() => {});
    };

    fetchLiveStats();
    return () => {
      isMounted = false;
    };
  }, []);

  const hero = data?.hero || {};
  const heroEyebrow = isRTL
    ? hero.eyebrow_ar || t("about_eyebrow")
    : hero.eyebrow || t("about_eyebrow");
  const heroTitle = isRTL
    ? hero.title_ar || t("about_title_1")
    : hero.title || t("about_title_1");
  const heroHighlight = isRTL
    ? hero.highlight_text_ar || t("about_title_2")
    : hero.highlight_text || t("about_title_2");
  const heroLead = isRTL
    ? hero.lead_ar || t("about_lead")
    : hero.lead || t("about_lead");
  const btnPrimaryText = isRTL
    ? hero.btn_primary_text_ar || `${t("about_btn_explore")} ←`
    : hero.btn_primary_text || `${t("about_btn_explore")} →`;
  const btnSecondaryText = isRTL
    ? hero.btn_secondary_text_ar || t("about_btn_join")
    : hero.btn_secondary_text || t("about_btn_join");

  const stats = useMemo(() => {
    const liveDownloads =
      realtime?.downloads ?? data?.stats?.[0]?.raw_count ?? null;
    const liveVisits = realtime?.visits ?? data?.stats?.[1]?.raw_count ?? null;
    const liveTemplates =
      realtime?.templates ?? data?.stats?.[2]?.raw_count ?? null;
    const liveRating = realtime?.rating ?? data?.stats?.[3]?.raw_count ?? null;

    return [
      {
        count:
          liveDownloads !== null
            ? `${Number(liveDownloads).toLocaleString()}+`
            : null,
        label: t("about_stat_downloads"),
        icon: "Download",
      },
      {
        count:
          liveVisits !== null
            ? `${Number(liveVisits).toLocaleString()}+`
            : null,
        label: t("about_stat_visits"),
        icon: "Eye",
      },
      {
        count:
          liveTemplates !== null
            ? `${Number(liveTemplates).toLocaleString()}+`
            : null,
        label: t("about_stat_templates"),
        icon: "FileCode2",
      },
      {
        count:
          liveRating !== null ? `${Number(liveRating).toFixed(1)} / 5.0` : null,
        label: t("about_stat_rating"),
        icon: "Star",
      },
    ];
  }, [data, realtime, t]);

  const story = data?.story || {};
  const storyEyebrow = isRTL
    ? story.eyebrow_ar || t("about_story_eyebrow")
    : story.eyebrow || t("about_story_eyebrow");
  const storyTitle = isRTL
    ? story.title_ar || t("about_story_title")
    : story.title || t("about_story_title");
  const storyP1 = isRTL
    ? story.paragraph_1_ar || t("about_story_p1")
    : story.paragraph_1 || t("about_story_p1");
  const storyP2 = isRTL
    ? story.paragraph_2_ar || t("about_story_p2")
    : story.paragraph_2 || t("about_story_p2");

  const values = useMemo(() => {
    if (data?.values?.length) {
      return data.values.map((v: any) => ({
        icon: v.icon,
        title: isRTL ? v.title_ar || v.title : v.title || v.title_ar,
        description: isRTL
          ? v.description_ar || v.description
          : v.description || v.description_ar,
      }));
    }
    return [
      {
        icon: "Target",
        title: t("about_values_quality"),
        description: t("about_values_quality_desc"),
      },
      {
        icon: "Users",
        title: t("about_values_community"),
        description: t("about_values_community_desc"),
      },
      {
        icon: "Heart",
        title: t("about_values_speed"),
        description: t("about_values_speed_desc"),
      },
    ];
  }, [data, t, isRTL]);

  const team = data?.team || [];
  const cta = data?.cta || {};
  const ctaTitle = isRTL
    ? cta.title_ar || t("cta_title")
    : cta.title || t("cta_title");
  const ctaDesc = isRTL
    ? cta.description_ar || t("cta_subtitle")
    : cta.description || t("cta_subtitle");
  const ctaBtnText = isRTL
    ? cta.button_text_ar || `${t("about_btn_join")} ←`
    : cta.button_text || `${t("about_btn_join")} →`;

  if (loading) {
    return <PageLoader />;
  }

  return (
    <main>
      <section className="about-hero">
        <div className="container about-grid">
          <div>
            <span className="eyebrow">{heroEyebrow}</span>
            <h1>
              {heroTitle}
              <br />
              <span className="gradient-text">{heroHighlight}</span>
            </h1>
            <p className="lead">{heroLead}</p>
            <div className="buttons-inline">
              <Link
                className="smallprimary"
                href={hero.btn_primary_url || "/templates"}
              >
                {btnPrimaryText}
              </Link>
              <Link
                className="outline"
                href={hero.btn_secondary_url || "/signup"}
              >
                {btnSecondaryText}
              </Link>
            </div>
          </div>
          <img
            src={getAssetUrl(hero.hero_image || "/assets/about-hero.png")}
            alt="About EzyTemplate"
          />
        </div>
      </section>

      <section className="container stats-grid">
        {stats.map((st: any, i: number) => {
          const Icon = iconMap[st.icon] || Download;
          return (
            <div className="stat" key={i}>
              <Icon />
              <div className="stat-info">
                {st.count ? (
                  <b>{st.count}</b>
                ) : (
                  <span className="stat-skeleton" />
                )}
                <span>{st.label}</span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="container story">
        <img
          src={getAssetUrl(story.image || "/assets/about-story.png")}
          alt="Our Story"
        />
        <div>
          <span className="eyebrow">{storyEyebrow}</span>
          <h2>{storyTitle}</h2>
          <p className="lead">{storyP1}</p>
          {storyP2 && <p className="lead">{storyP2}</p>}
          <div className="values">
            {values.map((v: any, i: number) => {
              const Icon =
                iconMap[v.icon] || (i === 0 ? Target : i === 1 ? Eye : Heart);
              return (
                <div key={i}>
                  <Icon />
                  <div className="values-content">
                    <b>{v.title}</b>
                    <span>{v.description}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {team.length > 0 && (
        <section className="team-section">
          <div className="container">
            <div
              className="section-head"
              style={{ textAlign: "center", marginBottom: "32px" }}
            >
              <div>
                <span className="eyebrow">
                  {team.length === 1
                    ? t("about_developer_eyebrow")
                    : t("about_team_eyebrow")}
                </span>
                <h2>
                  {team.length === 1
                    ? t("about_developer_title")
                    : t("about_team_title")}{" "}
                  <span className="gradient-text">EzyTemplate</span>
                </h2>
              </div>
            </div>

            {team.length === 1 ? (
              <div
                className="team-solo-card"
                style={{
                  maxWidth: "680px",
                  margin: "0 auto",
                  background: "var(--card-bg)",
                  border: "1px solid var(--line)",
                  borderRadius: "20px",
                  padding: "36px 32px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "140px",
                    height: "140px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "4px solid var(--blue, #2563eb)",
                    boxShadow: "0 8px 24px rgba(37, 99, 235, 0.3)",
                    marginBottom: "20px",
                    background: "linear-gradient(135deg, #0f172a, #1e3a5f)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="/assets/logo-icon.png"
                    alt="EzyTemplate"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "contain",
                    }}
                  />
                </div>

                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: "800",
                    margin: "0 0 6px",
                    color: "var(--text, #0f172a)",
                  }}
                >
                  {isRTL ? "فريق إيزي ستور" : "EzyStore Team"}
                </h3>

                <div
                  style={{
                    display: "inline-block",
                    padding: "4px 16px",
                    background: "rgba(37, 99, 235, 0.1)",
                    color: "var(--blue, #2563eb)",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "700",
                    marginBottom: "16px",
                  }}
                >
                  {isRTL ? "منصة الحلول الرقمية" : "Digital Solutions Platform"}
                </div>

                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: "1.7",
                    color: "var(--muted, #64748b)",
                    maxWidth: "540px",
                    margin: "0 0 24px",
                  }}
                >
                  {isRTL
                    ? "إيزي ستور هي الوجهة الرائدة لتوفير قوالب الويب الجاهزة، وأدوات واجهة المستخدم، والموارد الإبداعية التي تساعد المطورين والشركات على إطلاق مشاريعهم الرقمية بسرعة واحترافية."
                    : "EzyStore is the leading destination for ready-made web templates, UI kits, and creative resources that help developers and businesses launch their digital projects quickly and professionally."}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {team[0].linkedin && (
                    <a
                      href={team[0].linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 18px",
                        background: "#0a66c2",
                        color: "#fff",
                        borderRadius: "10px",
                        fontSize: "13px",
                        fontWeight: "600",
                        textDecoration: "none",
                        transition: "transform 0.2s, opacity 0.2s",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.opacity = "0.9")
                      }
                      onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      LinkedIn
                    </a>
                  )}

                  {team[0].facebook && (
                    <a
                      href={team[0].facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 18px",
                        background: "#1877f2",
                        color: "#fff",
                        borderRadius: "10px",
                        fontSize: "13px",
                        fontWeight: "600",
                        textDecoration: "none",
                        transition: "transform 0.2s, opacity 0.2s",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.opacity = "0.9")
                      }
                      onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook
                    </a>
                  )}

                  {team[0].github && (
                    <a
                      href={team[0].github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 18px",
                        background: "#24292e",
                        color: "#fff",
                        borderRadius: "10px",
                        fontSize: "13px",
                        fontWeight: "600",
                        textDecoration: "none",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  )}

                  {team[0].twitter && (
                    <a
                      href={team[0].twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 18px",
                        background: "#1da1f2",
                        color: "#fff",
                        borderRadius: "10px",
                        fontSize: "13px",
                        fontWeight: "600",
                        textDecoration: "none",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="team">
                {team.map((m: any, i: number) => (
                  <div className="team-card" key={i}>
                    <img
                      src={getAssetUrl(m.image || "/assets/article-web.png")}
                      alt={isRTL ? m.name_ar || m.name : m.name || m.name_ar}
                    />
                    <div>
                      <h3>
                        {isRTL ? m.name_ar || m.name : m.name || m.name_ar}
                      </h3>
                      <b>{isRTL ? m.role_ar || m.role : m.role || m.role_ar}</b>
                      <p>
                        {isRTL
                          ? m.bio_ar || m.bio
                          : m.bio ||
                            m.bio_ar ||
                            "Building better experiences for the web."}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          marginTop: "8px",
                          fontSize: "11px",
                        }}
                      >
                        {m.linkedin && (
                          <a
                            href={m.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#0a66c2", fontWeight: "600" }}
                          >
                            LinkedIn
                          </a>
                        )}
                        {m.facebook && (
                          <a
                            href={m.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#1877f2", fontWeight: "600" }}
                          >
                            Facebook
                          </a>
                        )}
                        {m.github && (
                          <a
                            href={m.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "var(--muted)" }}
                          >
                            GitHub
                          </a>
                        )}
                        {m.twitter && (
                          <a
                            href={m.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "var(--muted)" }}
                          >
                            Twitter
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="cta">
        <div className="container cta-in">
          <div>
            <h3>{cta.title || t("cta_title")}</h3>
            <p>{cta.description || t("cta_subtitle")}</p>
          </div>
          <Link className="whitebtn" href={cta.button_url || "/signup"}>
            {cta.button_text || `${t("about_btn_join")} ${isRTL ? "←" : "→"}`}
          </Link>
        </div>
      </section>
    </main>
  );
}
