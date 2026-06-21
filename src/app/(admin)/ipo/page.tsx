import { IpoContent } from "@/features/ipo";
import { loadIpoPageData } from "@/features/ipo/hooks";

export default async function IpoPage() {
  const { initialIpos, error } = await loadIpoPageData();

  return <IpoContent initialIpos={initialIpos} error={error} />;
}
