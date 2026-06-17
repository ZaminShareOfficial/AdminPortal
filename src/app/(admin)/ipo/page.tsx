import { IpoContent } from "@/features/ipo";
import { getErrorMessage } from "@/lib/api/errors";
import { listIpos, listProperties } from "@/lib/services/backend";

export default async function IpoPage() {
  try {
    const [ipos, properties] = await Promise.all([
      listIpos(),
      listProperties()
    ]);
    const approvedProperties = properties.filter(
      (property) => property.status === "APPROVED",
    );

    return (
      <IpoContent
        initialIpos={ipos}
        approvedProperties={approvedProperties}
      />
    );
  } catch (error) {
    return (
      <IpoContent
        initialIpos={[]}
        approvedProperties={[]}
        error={getErrorMessage(error, "Could not load IPOs from the backend.")}
      />
    );
  }
}
