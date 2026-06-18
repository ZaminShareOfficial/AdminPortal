import { PropertiesContent } from "@/features/properties";
import { loadPropertiesPageData } from "@/features/properties/hooks";

export default async function PropertiesPage() {
  const { initialProperties, error } = await loadPropertiesPageData();

  return (
    <PropertiesContent
      initialProperties={initialProperties}
      error={error}
    />
  );
}
