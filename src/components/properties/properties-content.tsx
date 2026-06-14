import { Icon } from "@/components/admin/icon";

type PropertyStatus = "Verified" | "Pending Review" | "Rejected";

type Property = {
  id: string;
  name: string;
  location: string;
  broker: string;
  brokerLink?: boolean;
  tokens: string;
  price: string;
  status: PropertyStatus;
  selected?: boolean;
};

const properties: Property[] = [
  {
    id: "ASSET-99230",
    name: "Amber Heights SEZ",
    location: "Mumbai, MH",
    broker: "Capital Heights Ltd.",
    brokerLink: true,
    tokens: "1,000,000",
    price: "$24.5M",
    status: "Verified",
  },
  {
    id: "ASSET-88210",
    name: "Skyline Industrial Park",
    location: "Bangalore, KA",
    broker: "Prime Realty Group",
    tokens: "500,000",
    price: "$12.8M",
    status: "Pending Review",
    selected: true,
  },
  {
    id: "ASSET-77102",
    name: "Oasis Commercial Hub",
    location: "Pune, MH",
    broker: "Apex Asset Mgmt",
    tokens: "2,500,000",
    price: "$8.5M",
    status: "Verified",
  },
  {
    id: "ASSET-66431",
    name: "Riverfront Logistics",
    location: "Surat, GJ",
    broker: "Prime Realty Group",
    tokens: "750,000",
    price: "$2.1M",
    status: "Rejected",
  },
];

const statusStyles: Record<PropertyStatus, string> = {
  Verified:
    "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  "Pending Review":
    "border border-secondary/20 bg-secondary-container/20 text-secondary",
  Rejected: "border border-error/20 bg-error/10 text-error",
};

export function PropertiesContent() {
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

        <div className="mb-6 flex flex-wrap items-center gap-4">
          <FilterSelect
            label="Location"
            id="location-filter"
            options={[
              "All Locations",
              "Mumbai Metropolitan",
              "Bangalore Tech Park",
              "Delhi Central",
            ]}
          />
          <FilterSelect
            label="Broker"
            id="broker-filter"
            options={[
              "All Brokers",
              "Capital Heights Ltd.",
              "Prime Realty Group",
              "Apex Asset Mgmt",
            ]}
          />
          <FilterSelect
            label="Status"
            id="status-filter"
            options={[
              "Any Status",
              "Verified",
              "Pending Review",
              "Rejected",
            ]}
          />
          <button
            type="button"
            className="mt-5 flex h-9 items-center gap-2 rounded border border-outline-variant/20 px-4 text-xs font-bold text-on-surface-variant transition-all hover:border-primary/40"
          >
            <Icon name="filter_alt_off" className="text-sm" />
            Clear
          </button>
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
              {properties.map((property) => (
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
                      className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${statusStyles[property.status]}`}
                    >
                      {property.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <aside className="w-96 overflow-y-auto border-l border-outline-variant/10 bg-surface-container-low p-6">
        <div className="mb-8">
          <h2 className="font-headline text-xl font-bold text-on-surface">
            Edit Asset
          </h2>
          <p className="mt-1 text-xs text-on-surface-variant">
            Configuring Skyline Industrial Park
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
                defaultValue="12,800,000"
                type="text"
              />
            </div>
            <p className="mt-2 flex items-center gap-1 text-[10px] text-on-surface-variant">
              <Icon name="info" className="text-[12px]" />
              Verified by 3rd party audit on Oct 12, 2023
            </p>
          </div>

          <div className="rounded border-b border-primary/20 bg-surface-container-lowest p-4">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-primary">
              Valuation Report
            </p>
            <button
              type="button"
              className="group flex w-full cursor-pointer items-center justify-between rounded border border-outline-variant/10 bg-surface-container-high p-3 transition-all hover:bg-surface-bright"
            >
              <div className="flex items-center gap-3">
                <Icon name="description" className="text-primary" />
                <div className="text-left">
                  <p className="text-xs font-bold text-on-surface">
                    Oct_2023_Audit.pdf
                  </p>
                  <p className="text-[10px] text-on-surface-variant">
                    2.4 MB • Signed & Sealed
                  </p>
                </div>
              </div>
              <Icon
                name="download"
                className="text-sm text-on-surface-variant transition-colors group-hover:text-primary"
              />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="token-supply"
                className="mb-2 block px-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant"
              >
                Token Supply
              </label>
              <input
                id="token-supply"
                className="w-full rounded border border-outline-variant/20 bg-surface-container-lowest px-4 py-2.5 text-sm text-on-surface outline-none transition-all focus:bg-surface-container-high focus:ring-1 focus:ring-primary-container"
                defaultValue={500000}
                type="number"
              />
            </div>
            <div className="flex items-center justify-between rounded border border-outline-variant/10 bg-surface-container p-3">
              <div>
                <p className="text-[10px] font-bold uppercase text-on-surface-variant">
                  Token Price
                </p>
                <p className="text-sm font-bold text-secondary">
                  $25.60{" "}
                  <span className="text-[10px] font-normal text-on-surface-variant">
                    / TOKEN
                  </span>
                </p>
              </div>
              <Icon name="calculate" className="text-outline-variant" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded border border-outline-variant/10 bg-surface-container p-3">
            <div>
              <p className="text-[10px] font-bold uppercase text-on-surface-variant">
                Returns Change (Annualized)
              </p>
              <p className="text-sm font-bold text-emerald-400">
                +12.4%{" "}
                <span className="text-[10px] font-normal lowercase text-on-surface-variant">
                  vs last year
                </span>
              </p>
            </div>
            <Icon name="trending_up" className="text-emerald-500/50" />
          </div>

          <div>
            <p className="mb-2 block px-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              Broker Assignment
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded border border-primary/30 bg-surface-container-high p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-highest">
                    <Icon name="person" className="text-sm text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface">
                      Prime Realty Group
                    </p>
                    <p className="text-[10px] text-on-surface-variant underline">
                      License #PRG-4452
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Remove broker"
                  className="text-on-surface-variant transition-colors hover:text-error"
                >
                  <Icon name="close" className="text-sm" />
                </button>
              </div>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded border border-dashed border-outline-variant/30 py-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant transition-all hover:border-primary/50 hover:text-on-surface"
              >
                <Icon name="add" className="text-sm" />
                Add Secondary Broker
              </button>
            </div>
          </div>

          <div className="space-y-3 border-t border-outline-variant/10 pt-8">
            <button
              type="button"
              className="saffron-gradient flex h-11 w-full items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-on-primary-fixed shadow-lg shadow-primary-container/20"
            >
              <Icon name="verified" className="text-lg" />
              Approve Property
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="h-10 border border-outline-variant/10 bg-surface-container-highest text-[10px] font-bold uppercase tracking-widest text-on-surface transition-all hover:bg-surface-bright"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="h-10 border border-error/20 bg-error/10 text-[10px] font-bold uppercase tracking-widest text-error transition-all hover:bg-error/20"
              >
                Reject Property
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

type FilterSelectProps = {
  label: string;
  id: string;
  options: string[];
};

function FilterSelect({ label, id, options }: FilterSelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="px-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant"
      >
        {label}
      </label>
      <select
        id={id}
        className="min-w-[140px] rounded border-none bg-surface-container-low px-3 py-2 pr-10 text-xs focus:ring-1 focus:ring-primary-container"
        defaultValue={options[0]}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
