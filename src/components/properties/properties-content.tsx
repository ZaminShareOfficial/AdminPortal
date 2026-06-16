import { Icon } from "@/components/admin/icon";
import { ApiErrorBanner } from "@/components/admin/api-error-banner";
import {
  getPropertyStatusClass,
  type PropertyRow,
} from "@/lib/mappers/property";

export type PropertyDetail = {
  id: string;
  name: string;
  location: string;
  broker: string;
  valuation: string;
  tokenSupply: string;
  tokenPrice: string;
  status: PropertyRow["status"];
};

type PropertiesContentProps = {
  properties: PropertyRow[];
  selectedProperty: PropertyDetail | null;
  error?: string | null;
};

export function PropertiesContent({
  properties,
  selectedProperty,
  error = null,
}: PropertiesContentProps) {
  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <section className="flex-1 overflow-y-auto p-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Institutional Console
            </span>
            <h1 className="mt-1 font-headline text-3xl font-extrabold text-on-surface">
              Property Management
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex rounded bg-surface-container p-1">
              <button
                type="button"
                className="rounded bg-surface-container-highest px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-on-surface"
              >
                List View
              </button>
              <button
                type="button"
                className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-on-surface-variant hover:text-on-surface"
              >
                Map View
              </button>
            </div>
            <button
              type="button"
              className="saffron-gradient flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-on-primary-fixed shadow-lg shadow-primary-container/20"
            >
              <Icon name="add" className="text-lg" />
              Create Property
            </button>
          </div>
        </div>

        {error ? (
          <div className="mb-6">
            <ApiErrorBanner message={error} />
          </div>
        ) : null}

        <div className="mb-6 flex flex-wrap items-center gap-4">
          <p className="text-xs text-on-surface-variant">
            Filters are not wired yet. Locations and brokers come from live property data in the table.
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-outline-variant/5 bg-surface-container">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-surface-container-lowest">
                {[
                  { label: "Property name", align: "left" },
                  { label: "Location", align: "left" },
                  { label: "Broker", align: "left" },
                  { label: "Total tokens", align: "left" },
                  { label: "Price", align: "right" },
                  { label: "Status", align: "center" },
                ].map((col) => (
                  <th
                    key={col.label}
                    scope="col"
                    className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ${
                      col.align === "right"
                        ? "text-right"
                        : col.align === "center"
                          ? "text-center"
                          : ""
                    }`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {properties.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-sm text-on-surface-variant"
                  >
                    No properties returned from the backend yet.
                  </td>
                </tr>
              ) : (
                properties.map((property) => (
                <tr
                  key={property.id}
                  className={`group cursor-pointer transition-colors hover:bg-surface-container-high ${
                    property.selected
                      ? "border-l-2 border-primary bg-surface-container-low"
                      : ""
                  }`}
                >
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-on-surface">
                        {property.name}
                      </span>
                      <span className="text-[10px] text-on-surface-variant">
                        {property.id}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-on-surface-variant">
                    {property.location}
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`text-xs font-medium ${
                        property.brokerLink
                          ? "text-tertiary underline decoration-tertiary/20"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {property.broker}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-headline text-sm text-on-surface">
                    {property.tokens}
                  </td>
                  <td className="px-6 py-5 text-right text-sm font-bold text-on-surface">
                    {property.price}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span
                      className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${getPropertyStatusClass(property.status)}`}
                    >
                      {property.status}
                    </span>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <aside className="w-96 overflow-y-auto border-l border-outline-variant/10 bg-surface-container-low p-6">
        {selectedProperty ? (
        <>
        <div className="mb-8">
          <h2 className="font-headline text-xl font-bold text-on-surface">
            Edit Asset
          </h2>
          <p className="mt-1 text-xs text-on-surface-variant">
            Configuring {selectedProperty.name}
          </p>
        </div>

        <div className="space-y-6">
          <div className="rounded border-b border-primary/20 bg-surface-container-lowest p-4">
            <label
              htmlFor="asset-valuation"
              className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-primary"
            >
              Asset Valuation
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">
                $
              </span>
              <input
                id="asset-valuation"
                className="w-full rounded border-none bg-surface-container-high py-2.5 pl-8 text-lg font-bold text-on-surface focus:ring-1 focus:ring-primary"
                defaultValue={selectedProperty.valuation.replace("$", "")}
                type="text"
                readOnly
              />
            </div>
            <p className="mt-2 flex items-center gap-1 text-[10px] text-on-surface-variant">
              <Icon name="info" className="text-[12px]" />
              Live value from GET /properties
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Location</p>
              <p className="text-sm text-on-surface">{selectedProperty.location}</p>
            </div>
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Token Supply</p>
              <p className="text-sm font-bold text-on-surface">{selectedProperty.tokenSupply}</p>
            </div>
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Token Price</p>
              <p className="text-sm font-bold text-secondary">{selectedProperty.tokenPrice}</p>
            </div>
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Listing Broker</p>
              <p className="text-sm text-on-surface">{selectedProperty.broker}</p>
            </div>
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Status</p>
              <span className={`inline-flex rounded px-2 py-0.5 text-[10px] font-bold uppercase ${getPropertyStatusClass(selectedProperty.status)}`}>
                {selectedProperty.status}
              </span>
            </div>
          </div>
        </div>
        </>
        ) : (
          <p className="text-sm text-on-surface-variant">
            Select a property from the list to view live details from the backend.
          </p>
        )}
      </aside>
    </div>
  );
}
