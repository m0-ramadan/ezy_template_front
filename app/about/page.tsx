import { getAboutContent, getRealtimeStats } from "@/lib/api";
import AboutView from "./AboutView";

export const revalidate = 300;

export default async function AboutPage() {
  const [data, realtime] = await Promise.all([
    getAboutContent(),
    getRealtimeStats().catch(() => null),
  ]);
  return <AboutView initialData={data} initialRealtime={realtime} />;
}
