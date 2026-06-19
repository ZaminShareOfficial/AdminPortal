import { IpoContent } from "@/components/ipo/ipo-content";
import { getErrorMessage } from "@/lib/api/errors";
import { guardUnauthorized } from "@/lib/auth/unauthorized";
import { mapIpoToRow } from "@/lib/mappers/ipo";
import { listIpos } from "@/lib/services/backend";

export default async function IpoPage() {
  try {
    const ipos = await listIpos();
    return <IpoContent ipos={ipos.map(mapIpoToRow)} />;
  } catch (error) {
    await guardUnauthorized(error);
    return (
      <IpoContent
        ipos={[]}
        error={getErrorMessage(error, "Could not load IPOs from the backend.")}
      />
    );
  }
}
