// EzyTemplate API Client - Connects Next.js Frontend to Laravel Backend

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:8002/api`
    : "http://127.0.0.1:8002/api");

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  (typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:8002`
    : "http://127.0.0.1:8002");

export function getAssetUrl(path: string | null | undefined): string {
  if (!path) return "/assets/travelix-card.png";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  if (path.startsWith("/storage/")) {
    return `${BACKEND_URL}${path}`;
  }
  if (path.startsWith("storage/")) {
    return `${BACKEND_URL}/${path}`;
  }
  return path;
}

export function normalizeTemplate(r: any, locale: string = "en") {
  if (!r) return null;
  const isAr = locale === "ar";

  // Extract features
  const rawFeatures =
    isAr &&
    r.features_ar &&
    (Array.isArray(r.features_ar)
      ? r.features_ar.length > 0
      : String(r.features_ar).trim().length > 0)
      ? r.features_ar
      : r.features;

  const features = Array.isArray(rawFeatures)
    ? rawFeatures
    : typeof rawFeatures === "string" && rawFeatures.trim()
      ? rawFeatures
          .split("\n")
          .map((s: string) => s.trim())
          .filter(Boolean)
      : [];

  const rawFeaturesEn = r.features;
  const features_en = Array.isArray(rawFeaturesEn)
    ? rawFeaturesEn
    : typeof rawFeaturesEn === "string" && rawFeaturesEn.trim()
      ? rawFeaturesEn
          .split("\n")
          .map((s: string) => s.trim())
          .filter(Boolean)
      : [];

  const rawFeaturesAr = r.features_ar;
  const features_ar = Array.isArray(rawFeaturesAr)
    ? rawFeaturesAr
    : typeof rawFeaturesAr === "string" && rawFeaturesAr.trim()
      ? rawFeaturesAr
          .split("\n")
          .map((s: string) => s.trim())
          .filter(Boolean)
      : [];

  const name = isAr
    ? r.title_ar || r.name_ar || r.title || r.name || "قالب"
    : r.title || r.name || r.title_ar || "Template";

  const categoryName = isAr
    ? r.category?.name_ar ||
      (typeof r.category === "string" ? r.category : r.category?.name) ||
      "قوالب"
    : r.category?.name ||
      (typeof r.category === "string" ? r.category : r.category?.name_ar) ||
      "Templates";

  const short_description = isAr
    ? r.short_description_ar || r.short_description || ""
    : r.short_description || r.short_description_ar || "";

  const description = isAr
    ? r.description_ar ||
      r.description ||
      r.short_description_ar ||
      r.short_description ||
      ""
    : r.description || r.short_description || r.description_ar || "";

  const tech_stack = isAr
    ? r.tech_stack_ar || r.tech_stack || ""
    : r.tech_stack || r.tech_stack_ar || "";

  return {
    id: r.id,
    slug: r.slug,
    name,
    title: name,
    name_en: r.title || r.name || "Template",
    name_ar: r.title_ar || r.name_ar || "",
    category: categoryName,
    category_id: r.category_id,
    subcategory: r.subcategory || null,
    subcategory_id: r.subcategory_id || r.subcategory?.id || null,
    subcategory_slug: r.subcategory?.slug || r.subcategory_slug || null,
    tech:
      tech_stack ||
      (r.resource_type ? r.resource_type.toUpperCase() : "HTML, CSS"),
    tech_stack,
    tech_stack_en: r.tech_stack || "",
    tech_stack_ar: r.tech_stack_ar || "",
    downloads_count:
      r.downloads_count !== undefined && r.downloads_count !== null
        ? r.downloads_count
        : 0,
    views_count:
      r.views_count !== undefined && r.views_count !== null ? r.views_count : 0,
    downloads:
      r.downloads_count !== undefined && r.downloads_count !== null
        ? `${r.downloads_count}`
        : r.downloads || "0",
    views:
      r.views_count !== undefined && r.views_count !== null
        ? `${r.views_count}`
        : r.views || "0",
    rating: r.rating ? `${r.rating}` : "5.0",
    image: getAssetUrl(r.preview_image || r.image),
    preview_image: getAssetUrl(r.preview_image || r.image),
    detail_image: getAssetUrl(r.detail_image || r.preview_image || r.image),
    screenshots: Array.isArray(r.screenshots)
      ? r.screenshots.map((s: string) => getAssetUrl(s))
      : typeof r.screenshots === "string" && r.screenshots.trim()
        ? r.screenshots
            .split("\n")
            .map((s: string) => getAssetUrl(s.trim()))
            .filter(Boolean)
        : [],
    features,
    features_en,
    features_ar,
    featured: !!r.featured,
    resourceType:
      r.resourceType ||
      (r.resource_type === "website"
        ? isAr
          ? "قالب موقع"
          : "Website Template"
        : r.resource_type === "excel"
          ? isAr
            ? "ملف إكسيل"
            : "Excel Template"
          : r.resource_type === "word"
            ? isAr
              ? "ملف وورد"
              : "Word Template"
            : r.resource_type === "design"
              ? isAr
                ? "تصميم"
                : "Design"
              : r.resource_type === "presentation"
                ? isAr
                  ? "عرض تقديمي"
                  : "Presentation"
                : isAr
                  ? "قالب موقع"
                  : "Website Template"),
    resource_type_raw: r.resource_type || "website",
    formats:
      r.formats ||
      (r.files?.length
        ? Array.from(
            new Set(
              r.files.map((f: any) => f.format || f.extension?.toUpperCase()),
            ),
          )
        : ["HTML", "ZIP"]),
    // Keep the API attachments on the normalized object. Download pages use
    // these ids to request the real file instead of generating a placeholder.
    files: Array.isArray(r.files) ? r.files : [],
    qualities: r.qualities || ["Standard", "HD"],
    size:
      r.size ||
      (r.files?.[0]?.size_human
        ? r.files[0].size_human
        : r.files?.[0]?.size_bytes
          ? `${(r.files[0].size_bytes / 1048576).toFixed(1)} MB`
          : "1.2 MB"),
    version: r.version || "1.0.0",
    license:
      r.license ||
      (isAr
        ? "مجاني للاستخدام الشخصي والتجاري"
        : "Free for Personal & Commercial Use"),
    short_description,
    short_description_en: r.short_description || "",
    short_description_ar: r.short_description_ar || "",
    description,
    description_en: r.description || "",
    description_ar: r.description_ar || "",
    price:
      r.is_free || r.price === 0 || r.price === "0.00" || r.price === "Free"
        ? isAr
          ? "مجاني"
          : "Free"
        : isAr
          ? "مدفوع"
          : "Premium",
    demo_url: r.demo_url
      ? getAssetUrl(r.demo_url)
      : r.canva_url || r.source_url || r.external_url || null,
    canva_url: r.canva_url || r.canva_preview_url || r.demo_url || null,
    source_url: r.source_url || r.canva_url || r.demo_url || null,
    external_url: r.external_url || r.source_url || r.demo_url || null,
  };
}

export function normalizeCategory(c: any, locale: string = "en") {
  if (!c) return null;
  const isAr = locale === "ar";
  return {
    id: c.id,
    name: isAr ? c.name_ar || c.name : c.name,
    name_en: c.name,
    name_ar: c.name_ar || c.name,
    slug: c.slug,
    description: isAr
      ? c.description_ar || c.description || ""
      : c.description || c.description_ar || "",
    description_en: c.description || "",
    description_ar: c.description_ar || "",
    icon: c.icon || "Folder",
    color: c.color || "#2563EB",
    resources_count: c.resources_count || 0,
    count: c.resources_count ? `${c.resources_count}` : "0",
  };
}

export function normalizeArticle(a: any, locale: string = "en") {
  if (!a) return null;
  const isAr = locale === "ar";
  return {
    id: a.id,
    slug: a.slug,
    title: isAr ? a.title_ar || a.title : a.title,
    title_en: a.title,
    title_ar: a.title_ar || a.title,
    excerpt: isAr
      ? a.excerpt_ar || a.excerpt || ""
      : a.excerpt || a.excerpt_ar || "",
    excerpt_en: a.excerpt || "",
    excerpt_ar: a.excerpt_ar || "",
    content: isAr
      ? a.content_ar || a.content || ""
      : a.content || a.content_ar || "",
    content_en: a.content || "",
    content_ar: a.content_ar || "",
    category: a.category || "General",
    author: a.author_name || "EzyTemplate Team",
    date: a.published_at
      ? new Date(a.published_at).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "Recent",
    readTime: `${a.reading_time || 5} ${isAr ? "دقائق" : "min read"}`,
    image: getAssetUrl(a.cover_image || "/assets/blog-1.png"),
  };
}

// 1. Site Settings & Branding
export async function getSiteSettings() {
  try {
    const res = await fetch(`${API_BASE_URL}/settings`, {
      next: { revalidate: 10 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch settings");
    return await res.json();
  } catch (err) {
    console.warn("Using fallback settings:", err);
    return {
      site_name: "EzyTemplate",
      site_name_ar: "إيزي تمبلت",
      site_tagline: "Beautiful Templates for Every Project",
      site_tagline_ar: "قوالب احترافية لكل مشروع وفكرة",
      site_description:
        "Discover thousands of free and premium website templates, UI kits, and design resources.",
      site_description_ar:
        "اكتشف آلاف القوالب المجانية والمدفوعة للمواقع، وحزم واجهات المستخدم، والموارد الرقمية.",
      contact_email: "support@ezytemplate.com",
      copyright_text: "© 2026 EzyTemplate by Ezystore. All rights reserved.",
      copyright_text_ar:
        "© 2026 إيزي تمبلت بواسطة إيزي ستور. جميع الحقوق محفوظة.",
      footer_subtext: "Build • Create • Share • Grow",
      footer_subtext_ar: "ابنِ • ابتكر • شارك • انطلق",
      social_links: [
        { platform: "Twitter/X", url: "https://twitter.com", is_active: true },
        { platform: "GitHub", url: "https://github.com", is_active: true },
        { platform: "LinkedIn", url: "https://linkedin.com", is_active: true },
      ],
      header_nav_links: [
        {
          label: "Templates",
          label_ar: "القوالب",
          url: "/templates",
          is_active: true,
        },
        {
          label: "Categories",
          label_ar: "التصنيفات",
          url: "/categories",
          is_active: true,
        },
        { label: "Blog", label_ar: "المدونة", url: "/blog", is_active: true },
        {
          label: "Services",
          label_ar: "الخدمات",
          url: "/services",
          is_active: true,
        },
        { label: "About", label_ar: "من نحن", url: "/about", is_active: true },
      ],
      footer_columns: [
        {
          title: "Quick Links",
          title_ar: "روابط سريعة",
          links: [
            { label: "Home", label_ar: "الرئيسية", url: "/" },
            { label: "Templates", label_ar: "القوالب", url: "/templates" },
            { label: "Categories", label_ar: "التصنيفات", url: "/categories" },
            { label: "Blog", label_ar: "المدونة", url: "/blog" },
            { label: "About", label_ar: "من نحن", url: "/about" },
          ],
        },
        {
          title: "Resources",
          title_ar: "الموارد",
          links: [
            {
              label: "Documentation",
              label_ar: "التوثيق والشروحات",
              url: "/blog",
            },
            { label: "Freebies", label_ar: "قوالب مجانية", url: "/templates" },
            { label: "UI Kits", label_ar: "حزم الواجهات", url: "/templates" },
          ],
        },
        {
          title: "Help & Support",
          title_ar: "المساعدة والدعم",
          links: [
            { label: "FAQ", label_ar: "الأسئلة الشائعة", url: "/services" },
            { label: "Support", label_ar: "الدعم الفني", url: "/services" },
            { label: "Contact", label_ar: "اتصل بنا", url: "/about" },
          ],
        },
      ],
    };
  }
}

// 2. Homepage Content
export async function getHomeContent() {
  try {
    const res = await fetch(`${API_BASE_URL}/content/home`, {
      next: { revalidate: 10 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch home content");
    return await res.json();
  } catch (err) {
    console.warn("Using fallback home content:", err);
    return {
      hero: {
        eyebrow: "Free & Premium Website Templates",
        eyebrow_ar: "أصول وقوالب رقمية مجانية ومدفوعة",
        title: "Beautiful Templates",
        title_ar: "قوالب مختارة باحترافية",
        highlight_text: "for Every Project",
        highlight_text_ar: "لكل مشروع وفكرة",
        lead: "Discover thousands of free and premium website templates, UI kits, and design resources. Download, customize, and build your next amazing project faster.",
        lead_ar:
          "اكتشف آلاف القوالب المجانية والمدفوعة للمواقع، وحزم واجهات المستخدم، وملفات إكسيل ووورد الجاهزة، وموارد التصميم. حمّل، عدّل، وأطلق مشروعك القادم بسرعة فائقة.",
        hero_image: "/assets/hero-main.png",
        note_title: "Your Next Website",
        note_title_ar: "مشروعك القادم",
        note_subtitle: "Starts Here",
        note_subtitle_ar: "يبدأ هنا",
        stat_badge_1_val: "1000+",
        stat_badge_1_label: "Free Templates",
        stat_badge_1_label_ar: "قالب مجاني",
        stat_badge_2_val: "Modern",
        stat_badge_2_label: "& Responsive",
        stat_badge_2_label_ar: "ومتجاوب بالكامل",
        stat_badge_3_val: "⚡ Easy to",
        stat_badge_3_label: "Customize",
        stat_badge_3_label_ar: "جاهز للتعديل",
      },
      popular_tags: [
        "Laravel",
        "Next.js",
        "Admin Dashboard",
        "eCommerce",
        "Portfolio",
        "Blog",
      ],
      popular_tags_ar: [
        "لارافيل",
        "نيكست جي اس",
        "لوحة تحكم",
        "متجر إلكتروني",
        "معرض أعمال",
        "مدونة",
      ],
      featured_section: {
        eyebrow: "Featured Templates",
        eyebrow_ar: "قوالب مميزة",
        title: "Trending Templates",
        title_ar: "القوالب الأكثر طلباً وتفاعلاً",
        description: "Hand-picked templates to help you build faster.",
        description_ar:
          "قوالب منتقاة بعناية لمساعدتك في البناء والإنجاز بشكل أسرع.",
      },
      benefits: [
        {
          icon: "Zap",
          title: "100% Free",
          title_ar: "مجاني 100%",
          description: "High-quality templates completely free to download.",
          description_ar: "قوالب وأصول عالية الجودة متاحة للتحميل المباشر.",
        },
        {
          icon: "MonitorCog",
          title: "Responsive Design",
          title_ar: "تصميم متجاوب بالكامل",
          description: "Works perfectly on all devices and screen sizes.",
          description_ar: "يعمل بسلاسة تامة على الهواتف والشاشات المختلفة.",
        },
        {
          icon: "Settings2",
          title: "Easy to Customize",
          title_ar: "سهل التخصيص والتعديل",
          description: "Clean and well-documented code.",
          description_ar: "أكواد برمجية نظيفة وتوثيق شامل لكل مكون.",
        },
        {
          icon: "Users",
          title: "Trusted by Developers",
          title_ar: "موثوق من المطورين",
          description: "Join thousands of developers worldwide.",
          description_ar: "انضم إلى آلاف المطورين والشركات حول العالم.",
        },
      ],
      cta: {
        title: "Ready to Build Something Amazing?",
        title_ar: "هل أنت مستعد لبناء مشروعك القادم؟",
        description:
          "Join our community and get access to the latest templates, updates, and resources.",
        description_ar:
          "انضم إلى مجتمعنا واحصل على أحدث القوالب والتحديثات والموارد الرقمية المتجددة.",
        button_text: "Get Started for Free →",
        button_text_ar: "ابدأ مجاناً الآن ←",
        button_url: "/templates",
      },
    };
  }
}

// 3. About Page Content
export async function getAboutContent() {
  try {
    const res = await fetch(`${API_BASE_URL}/content/about`, {
      next: { revalidate: 10 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch about content");
    return await res.json();
  } catch (err) {
    console.warn("Using fallback about content:", err);
    return {
      hero: {
        eyebrow: "About Us",
        eyebrow_ar: "من نحن",
        title: "We Empower",
        title_ar: "نحن نمكّن",
        highlight_text: "Creators & Builders",
        highlight_text_ar: "المطورين والمبدعين",
        lead: "At EzyTemplate, we believe everyone can build something amazing.",
        lead_ar:
          "في إيزي تمبلت، نؤمن أن الجميع قادر على بناء مشاريع وتطبيقات مذهلة بأسرع وقت وأقل جهد.",
        hero_image: "/assets/about-hero.png",
        btn_primary_text: "Explore Templates →",
        btn_primary_text_ar: "استكشف القوالب ←",
        btn_primary_url: "/templates",
        btn_secondary_text: "Join Our Community",
        btn_secondary_text_ar: "انضم إلى مجتمعنا",
        btn_secondary_url: "/signup",
      },
      stats: [
        {
          icon: "Download",
          count: "28,000+",
          raw_count: 28000,
          label: "Total Downloads",
          label_ar: "إجمالي التحميلات",
        },
        {
          icon: "Eye",
          count: "465+",
          raw_count: 465,
          label: "Total Visits",
          label_ar: "إجمالي الزيارات",
        },
        {
          icon: "FileCode2",
          count: "13+",
          raw_count: 13,
          label: "Active Templates",
          label_ar: "قالب متاح",
        },
        {
          icon: "Star",
          count: "4.7 / 5.0",
          raw_count: 4.7,
          label: "Average Rating",
          label_ar: "متوسط التقييمات",
        },
      ],
      story: {
        eyebrow: "Our Story",
        eyebrow_ar: "قصتنا",
        title: "A Passion for Better Web Experiences",
        title_ar: "شغف بتقديم تجارب ويب أفضل وأسرع",
        image: "/assets/about-story.png",
        paragraph_1:
          "EzyTemplate started as a small idea between a group of developers and designers.",
        paragraph_1_ar:
          "تأسست منصة إيزي تمبلت كفكرة رائدة بين نخبة من المطورين والمصممين لحل مشكلة إهدار الوقت في بناء القوالب المتكررة.",
        paragraph_2:
          "Today, EzyTemplate is a growing community of creators and businesses.",
        paragraph_2_ar:
          "اليوم، أصبحت إيزي تمبلت مجتمعاً متنامياً يثق به آلاف المطورين والشركات لإنجاز مواقعهم باحترافية.",
      },
      values: [
        {
          icon: "Target",
          title: "Our Mission",
          title_ar: "مهمتنا",
          description: "To simplify website development for everyone.",
          description_ar:
            "تبسيط وتسريع تطوير المواقع للجميع بأعلى معايير الجودة.",
        },
        {
          icon: "Eye",
          title: "Our Vision",
          title_ar: "رؤيتنا",
          description: "A world where great design is accessible to all.",
          description_ar:
            "عالم يكون فيه التصميم الراقي والكود النظيف متاحاً لكل مبدع.",
        },
        {
          icon: "Heart",
          title: "Our Values",
          title_ar: "قيمنا",
          description:
            "Quality, community, creativity, and continuous improvement.",
          description_ar:
            "الجودة الفائقة، المجتمع أولاً، الإبداع، والتطوير المستمر.",
        },
      ],
      team: [
        {
          name: "Mohamed Ramadan",
          name_ar: "محمد رمضان",
          role: "Software Engineer",
          role_ar: "مهندس برمجيات",
          bio: "Software Engineer specialized in full-stack web development, building high-performance scalable systems and modern digital platforms.",
          bio_ar:
            "مهندس برمجيات متخصص في تطوير الويب الشامل والحلول البرمجية عالية الأداء وبناء المنصات الرقمية الحديثة.",
          image: "/assets/mohamed-ramadan.png",
          linkedin: "http://linkedin.com/in/mohamed-ramadan-zaki/",
          facebook: "https://www.facebook.com/profile.php?id=61589459066799",
        },
      ],
      cta: {
        title: "Join Our Growing Community",
        title_ar: "انضم إلى مجتمعنا المتنامي",
        description: "Be part of thousands of developers and designers.",
        description_ar:
          "كن جزءاً من آلاف المطورين والمصممين الذين يبنون تجارب رقمية استثنائية.",
        button_text: "Get Started →",
        button_text_ar: "ابدأ الآن ←",
        button_url: "/signup",
      },
    };
  }
}

// 4. Services Page Content
export async function getServicesContent() {
  try {
    const res = await fetch(`${API_BASE_URL}/content/services`, {
      next: { revalidate: 10 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch services content");
    return await res.json();
  } catch (err) {
    console.warn("Using fallback services content:", err);
    return {
      hero: {
        eyebrow: "Our Services",
        eyebrow_ar: "خدماتنا الاحترافية",
        title: "More Than Templates",
        title_ar: "أكثر من مجرد قوالب",
        highlight_text: "We Help You Build",
        highlight_text_ar: "نحن نساعدك في البناء والنمو",
        lead: "From customization to full website development, EzyTemplate offers professional services to help you launch, customize, and grow your online projects.",
        lead_ar:
          "من تخصيص القوالب إلى تطوير المواقع والتطبيقات الكاملة، نقدم خدمات برمجية وتصميمية احترافية لمساعدتك في إطلاق مشاريعك الرقمية بنجاح.",
        hero_image: "/assets/services-hero.png",
        btn_primary_text: "Get Started →",
        btn_primary_text_ar: "طلب عرض سعر ←",
        btn_primary_url: "#request-service",
        btn_secondary_text: "Explore FAQs",
        btn_secondary_text_ar: "الأسئلة الشائعة",
        btn_secondary_url: "#faq",
      },
      trust_badges: [
        {
          icon: "ShieldCheck",
          title: "Trusted & Reliable",
          title_ar: "موثوق ومضمون",
          subtitle: "Quality work, on time",
          subtitle_ar: "جودة عالية في الموعد",
        },
        {
          icon: "Zap",
          title: "Fast Delivery",
          title_ar: "تسليم سريع",
          subtitle: "Get your project done quickly",
          subtitle_ar: "إنجاز مشروعك بسرعة فائقة",
        },
        {
          icon: "Award",
          title: "Satisfaction Guarantee",
          title_ar: "ضمان الرضا التام",
          subtitle: "We're not happy until you are",
          subtitle_ar: "نعمل حتى تكون راضياً 100%",
        },
      ],
      services: [],
      why_us: {
        eyebrow: "Why Choose Us",
        eyebrow_ar: "لماذا تختارنا",
        title: "Your Success is Our Priority",
        title_ar: "نجاح مشروعك هو أولويتنا الأولى",
        lead: "We combine technical expertise, creative design, and reliable support to deliver the best solutions.",
        lead_ar:
          "نجمع بين الخبرة التقنية العميقة، التصميم الإبداعي، والدعم الموثوق لتقديم أفضل الحلول لمشاريعك.",
        image: "/assets/services-why.png",
        bullets: [
          "Experienced Developers & Designers",
          "High-Quality Work",
          "On-Time Delivery",
        ],
        bullets_ar: [
          "مطورون ومصممون ذوو خبرة واسعة",
          "أكواد نظيفة وأعلى معايير الجودة",
          "التزام دقيق بمواعيد التسليم",
        ],
      },
      process: [],
      faqs: [],
      help_box: {
        title: "Still Have Questions?",
        title_ar: "هل لا يزال لديك أي استفسار؟",
        description:
          "We're here to help. Contact our team and we'll get back to you as soon as possible.",
        description_ar:
          "نحن هنا دائماً لمساعدتك. تواصل مع فريقنا وسنرد عليك في أسرع وقت.",
        button_text: "Contact Us →",
        button_text_ar: "تواصل معنا ←",
        button_url: "#request-service",
      },
    };
  }
}

// 5. Resources / Templates
export async function getResources(
  params: {
    type?: string;
    category?: string;
    search?: string;
    featured?: boolean;
    sort?: string;
    page?: number;
    per_page?: number;
  } = {},
) {
  try {
    const query = new URLSearchParams();
    if (
      params.type &&
      params.type !== "All Resources" &&
      params.type !== "All"
    ) {
      const typeMap: Record<string, string> = {
        "Website Template": "website",
        "Excel Template": "excel",
        "Word Template": "word",
        Design: "design",
        Presentation: "presentation",
        "UI Kit": "ui-kit",
      };
      query.set("type", typeMap[params.type] || params.type.toLowerCase());
    }
    if (params.category && params.category !== "All") {
      query.set("category", params.category);
    }
    if (params.search) query.set("search", params.search);
    if (params.featured) query.set("featured", "1");
    if (params.sort) query.set("sort", params.sort);
    if (params.page) query.set("page", params.page.toString());
    if (params.per_page) query.set("per_page", params.per_page.toString());

    const res = await fetch(`${API_BASE_URL}/resources?${query.toString()}`, {
      next: { revalidate: 10 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch resources");
    return await res.json();
  } catch (err) {
    console.warn("Using fallback resources:", err);
    return { data: [], total: 0 };
  }
}

export async function getResourceBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/resources/${slug}`, {
      next: { revalidate: 10 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("Resource not found");
    return await res.json();
  } catch (err) {
    console.warn("Failed to fetch resource slug:", slug, err);
    return null;
  }
}

// 6. Categories
export async function getCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      next: { revalidate: 10 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch categories");
    return await res.json();
  } catch (err) {
    console.warn("Using fallback categories:", err);
    return [];
  }
}

// 7. Articles / Blog
export async function getArticles(
  params: {
    category?: string;
    search?: string;
    page?: number;
    per_page?: number;
  } = {},
) {
  try {
    const query = new URLSearchParams();
    if (params.category && params.category !== "All")
      query.set("category", params.category);
    if (params.search) query.set("search", params.search);
    if (params.page) query.set("page", params.page.toString());
    if (params.per_page) query.set("per_page", params.per_page.toString());

    const res = await fetch(`${API_BASE_URL}/articles?${query.toString()}`, {
      next: { revalidate: 10 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch articles");
    return await res.json();
  } catch (err) {
    console.warn("Using fallback articles:", err);
    return { data: [], total: 0 };
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/articles/${slug}`, {
      next: { revalidate: 10 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("Article not found");
    return await res.json();
  } catch (err) {
    console.warn("Failed to fetch article slug:", slug, err);
    return null;
  }
}

// 8. Actions (Newsletter & Service Requests)
export async function subscribeNewsletter(email: string) {
  const res = await fetch(`${API_BASE_URL}/newsletter`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email }),
  });
  return await res.json();
}

export async function submitServiceRequest(data: {
  name: string;
  email: string;
  service: string;
  message: string;
  budget?: string;
}) {
  const res = await fetch(`${API_BASE_URL}/service-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function getCustomPageContent(key: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/content/page/${key}`, {
      next: { revalidate: 10 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok)
      throw new Error(`Failed to fetch custom page content for ${key}`);
    return await res.json();
  } catch (err) {
    console.warn(`Failed to fetch custom page ${key}:`, err);
    return null;
  }
}

// 9. User Authentication APIs
export async function apiLogin(credentials: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(credentials),
  });
  return await res.json();
}

export async function apiRegister(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

// 10. Real-time Live Stats
export async function getRealtimeStats() {
  try {
    const res = await fetch(`${API_BASE_URL}/stats/realtime`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch realtime stats");
    return await res.json();
  } catch (err) {
    return null;
  }
}

// 11. Tools API Services
export async function getToolsFromApi(params?: {
  category?: string;
  q?: string;
}) {
  try {
    const query = new URLSearchParams();
    if (params?.category) query.append("category", params.category);
    if (params?.q) query.append("q", params.q);

    const res = await fetch(`${API_BASE_URL}/tools?${query.toString()}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function getToolBySlugFromApi(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/tools/${slug}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function trackToolEvent(
  slug: string,
  eventType: string,
  payload?: {
    status?: string;
    processing_time_ms?: number;
    input_size_bytes?: number;
    output_size_bytes?: number;
  },
) {
  try {
    await fetch(`${API_BASE_URL}/tools/${slug}/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ event_type: eventType, ...payload }),
    });
  } catch (err) {
    // Ignore analytics tracking failures silently
  }
}
