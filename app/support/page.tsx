import { getCustomPageContent } from "@/lib/api";
import SupportView from "./SupportView";

export const revalidate = 300;

export default async function SupportPage() {
  const data = await getCustomPageContent("support");
  return <SupportView initialData={data} />;
}
