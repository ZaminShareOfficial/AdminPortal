import { IpoContent } from "@/components/ipo/ipo-content";
import { getErrorMessage } from "@/lib/api/errors";
import { mapIpoToRow } from "@/lib/mappers/ipo";
import { listIpos } from "@/lib/services/backend";

export default async function IpoPage() {
  try {
    const ipos = await listIpos();
    return <IpoContent ipos={ipos.map(mapIpoToRow)} />;
  } catch (error) {
    return (
      <IpoContent
        ipos={[]}
        error={getErrorMessage(error, "Could not load IPOs from the backend.")}
      />
    );
  }
}
