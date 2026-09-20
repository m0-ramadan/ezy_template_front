const categoryPages = {
  "design-templates": [
    "business-cards", "certificates-awards", "corporate-identity", "events-invitations",
    "restaurant-menus", "wall-art-posters", "food-restaurant", "beauty-wellness",
    "healthcare-medical", "fashion-retail", "technology-digital", "real-estate-architecture",
    "business-professional", "legal-finance", "education", "sports-fitness",
    "events-holidays", "creative-design", "home-services", "religion-spirituality",
    "automotive", "travel-tourism", "books-publishing",
  ],
  "excel-templates": [
    "accounting", "business-financial-planning", "finance", "human-resources", "inventory",
    "personal-financial-planning", "project-management", "social-media-marketing", "sales-reporting",
  ],
  "word-templates": ["business-financial-planning", "finance", "personal-financial-planning", "project-management"],
  "presentation-templates": ["social-media-marketing"],
  "website-templates": ["html-css", "wordpress", "react-nextjs", "tailwind-css"],
};

export default function sitemap() {
  const staticPages = [
    "/", "/templates", "/download", "/blog", "/about", "/services",
    "/login", "/signup", ...Object.keys(categoryPages).map((page) => `/${page}`),
  ];
  const filters = Object.entries(categoryPages).flatMap(([page, categories]) =>
    categories.map((category) => `/${page}/${category}`),
  );

  return [...staticPages, ...filters].map((url) => ({
    url: `https://ezytemplate.example${url}`,
    lastModified: new Date(),
  }));
}
