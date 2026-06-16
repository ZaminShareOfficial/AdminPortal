import { PropertiesContent } from "@/components/properties/properties-content";
import { getErrorMessage } from "@/lib/api/errors";
import { mapPropertyToDetail, mapPropertyToRow } from "@/lib/mappers/property";
import { listProperties } from "@/lib/services/backend";

export default async function PropertiesPage() {
  try {
    const properties = await listProperties();
    return (
      <PropertiesContent
        properties={properties.map(mapPropertyToRow)}
        selectedProperty={
          properties[0] ? mapPropertyToDetail(properties[0]) : null
        }
      />
    );
  } catch (error) {
    return (
      <PropertiesContent
        properties={[]}
        selectedProperty={null}
        error={getErrorMessage(
          error,
          "Could not load properties from the backend.",
        )}
      />
    );
  }
}
