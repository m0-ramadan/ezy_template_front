export type ResourceType =
  | "Website Template"
  | "Excel Template"
  | "Word Template"
  | "Design"
  | "Presentation"
  | "UI Kit"
  | "Graphic Asset"
  | "Canva Template"
  | "website"
  | "excel"
  | "word"
  | "design"
  | "presentation"
  | "ui-kit"
  | "graphics"
  | "canva";

export type Template = {
  id?: string | number;
  slug: string;
  name: string;
  name_en?: string;
  name_ar?: string;
  title?: string;
  title_ar?: string;
  category: string;
  category_ar?: string;
  tech?: string;
  tech_stack?: string;
  tech_stack_ar?: string;
  downloads?: string;
  rating?: string;
  image?: string;
  preview_image?: string;
  detail_image?: string;
  screenshots?: string[];
  features?: string[];
  features_en?: string[];
  features_ar?: string[];
  featured?: boolean;
  resourceType: ResourceType;
  formats?: string[];
  qualities?: string[];
  size?: string;
  version?: string;
  license?: string;
  license_ar?: string;
  description: string;
  description_ar?: string;
  short_description?: string;
  short_description_ar?: string;
  price?: "Free" | "Premium" | string | number;
  is_free?: boolean;
  demo_url?: string | null;
};

export const templates: Template[] = [];
