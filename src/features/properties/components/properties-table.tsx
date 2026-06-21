import { getPropertyStatusClass, type PropertyRow } from "@/lib/mappers/property";

type PropertiesTableProps = {
  properties: PropertyRow[];
  selectedId: string | null;
  onSelect: (propertyId: string) => void;
};

const TABLE_COLUMNS = [
  { label: "Property name", align: "left" as const },
  { label: "Location", align: "left" as const },
  { label: "Broker", align: "left" as const },
  { label: "Total tokens", align: "left" as const },
  { label: "Price", align: "right" as const },
  { label: "Status", align: "center" as const }
];

export const PropertiesTable = ({
  properties,
  selectedId,
  onSelect
}: PropertiesTableProps) => (
  <div className="overflow-hidden rounded-lg border border-outline-variant/5 bg-surface-container">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left">
      <thead>
        <tr className="bg-surface-container-lowest">
          {TABLE_COLUMNS.map((col) => (
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
              onClick={() => onSelect(property.id)}
              className={`group cursor-pointer transition-colors hover:bg-surface-container-high ${
                selectedId === property.id
                  ? "border-l-2 border-primary bg-surface-container-low"
                  : ""
              }`}
              data-testid={`property-row-${property.id}`}
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
  </div>
);
