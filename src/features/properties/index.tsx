"use client";

import { useMemo, useState } from "react";
import { ApiErrorBanner } from "@/components/admin/api-error-banner";
import { CreatePropertyTrigger } from "@/features/properties/components/create-property-modal";
import { PropertiesTable } from "@/features/properties/components/properties-table";
import { PropertyEditPanel } from "@/features/properties/components/property-edit-panel";
import type { PropertiesContentProps } from "@/features/properties/types";
import { usePropertyActions } from "@/features/properties/use-property-actions";
import { mapPropertyToRow } from "@/lib/mappers/property";

export function PropertiesContent({
  initialProperties,
  error = null
}: PropertiesContentProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    initialProperties[0]?.id ?? null,
  );
  const propertyActions = usePropertyActions();

  const properties = useMemo(
    () => initialProperties.map(mapPropertyToRow),
    [initialProperties],
  );

  const selectedProperty = useMemo(
    () => initialProperties.find((property) => property.id === selectedId) ?? null,
    [initialProperties, selectedId],
  );

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
          <CreatePropertyTrigger propertyActions={propertyActions} />
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

        <PropertiesTable
          properties={properties}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </section>

      <aside className="w-96 overflow-y-auto border-l border-outline-variant/10 bg-surface-container-low p-6">
        <PropertyEditPanel
          property={selectedProperty}
          propertyActions={propertyActions}
        />
      </aside>
    </div>
  );
}
