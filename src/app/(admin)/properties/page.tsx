import { PropertiesContent } from "@/features/properties";
import { getErrorMessage } from "@/lib/api/errors";
import { listProperties } from "@/lib/services/backend";

export default async function PropertiesPage() {
  try {
    const properties = await listProperties();
    return <PropertiesContent initialProperties={properties} />;
  } catch (error) {
    return (
      <PropertiesContent
        initialProperties={[]}
        error={getErrorMessage(
          error,
          "Could not load properties from the backend.",
        )}
      />
    );
  }
}
