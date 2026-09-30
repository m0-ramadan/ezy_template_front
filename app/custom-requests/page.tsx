import { getCustomPageContent } from "@/lib/api";
import CustomRequestsView from "./CustomRequestsView";

export const revalidate = 300;

export default async function CustomRequestsPage() {
  const data = await getCustomPageContent("custom_requests");
  return <CustomRequestsView initialData={data} />;
}
