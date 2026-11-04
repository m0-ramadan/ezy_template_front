import {
  getCollectionData,
  type CollectionKey,
  type CollectionFacet,
} from "@/lib/catalog";

/**
 * Navigation facets for the mega menu.
 *
 * The menu used to hard-code sub-category slugs such as
 * `/website-templates/e-commerce` and `/excel-templates/sales-reporting`.
 * Those facets do not exist in the catalogue, so every one of those links
 * answered 404. The menu is now built from the same facet list the category
 * pages validate against, which means a menu link can never 404.
 */

export type NavFacet = { slug: string; label: string; labelAr: string };

export type NavGroup = {
  key: CollectionKey;
  href: string;
  title: string;
  titleAr: string;
  items: NavFacet[];
};

export const COLLECTION_PATHS: Record<CollectionKey, string> = {
  website: "website-templates",
  excel: "excel-templates",
  word: "word-templates",
  design: "design-templates",
  canva: "canva-templates",
  presentation: "presentation-templates",
};

const LABELS: Record<CollectionKey, { en: string; ar: string }> = {
  website: { en: "Website Templates", ar: "قوالب المواقع" },
  excel: { en: "Excel Templates", ar: "قوالب إكسيل" },
  word: { en: "Word Templates", ar: "قوالب وورد" },
  design: { en: "Design Templates", ar: "قوالب التصميم" },
  canva: { en: "Canva Templates", ar: "قوالب Canva" },
  presentation: { en: "Presentations", ar: "العروض التقديمية" },
};

const ORDER: CollectionKey[] = [
  "website",
  "excel",
  "word",
  "design",
  "presentation",
  "canva",
];

function toNavFacet(facet: CollectionFacet): NavFacet {
  return {
    slug: facet.slug,
    label: facet.label,
    labelAr: facet.labelAr || facet.label,
  };
}

export async function getNavigationFacets(
  perGroup = 8,
): Promise<NavGroup[]> {
  const groups = await Promise.all(
    ORDER.map(async (key) => {
      const data = await getCollectionData(key);
      const items = data.facets
        .filter((facet) => facet.count > 0)
        // A facet whose slug equals the collection path is the category
        // fallback (e.g. /website-templates/website-templates); the group
        // heading already links to that page.
        .filter((facet) => facet.slug !== COLLECTION_PATHS[key])
        .slice(0, perGroup)
        .map(toNavFacet);
      return {
        key,
        href: `/${COLLECTION_PATHS[key]}`,
        title: LABELS[key].en,
        titleAr: LABELS[key].ar,
        items,
        total: data.total,
      };
    }),
  );

  // Only surface collections that actually have published templates. A
  // collection without sub-categories is still listed (as a plain link).
  return groups
    .filter((group) => group.total > 0 || group.items.length > 0)
    .map(({ total, ...group }) => group);
}
