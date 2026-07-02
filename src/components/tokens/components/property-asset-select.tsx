"use client";

import { Icon } from "@/components/admin/icon";
import {
  ListBox,
  ListBoxItem,
  Select
} from "@heroui/react";
import { useMemo } from "react";

export type TokenRegistryProperty = {
  propertyId: string;
  propertyTitle: string;
};

type PropertyAssetSelectProps = {
  properties: TokenRegistryProperty[];
  selectedPropertyId: string;
  onSelect: (propertyId: string) => void;
  isLoading?: boolean;
};

const getPropertyInitials = (title: string) => title.slice(0, 2).toUpperCase();

export const PropertyAssetSelect = ({
  properties,
  selectedPropertyId,
  onSelect,
  isLoading = false
}: PropertyAssetSelectProps) => {
  const selectedProperty = properties.find(
    (property) => property.propertyId === selectedPropertyId
  );

  const items = useMemo(
    () =>
      properties.map((property) => ({
        id: property.propertyId,
        label: property.propertyTitle,
        propertyId: property.propertyId
      })),
    [properties]
  );

  return (
    <div
      className="col-span-12 flex flex-col justify-between rounded bg-surface-container p-6 transition-all lg:col-span-4"
      data-testid="token-registry-property-card"
    >
      <div className="space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          Select Active Asset
        </span>

        {properties.length === 0 ? (
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-2">
            <div>
              <p className="font-headline text-lg font-bold">No active property</p>
              <p className="text-xs text-on-surface-variant">—</p>
            </div>
          </div>
        ) : (
          <Select
            selectedKey={selectedPropertyId}
            isDisabled={isLoading}
            onSelectionChange={(key) => {
              if (key == null) {
                return;
              }

              const nextPropertyId = String(key);
              if (nextPropertyId !== selectedPropertyId) {
                onSelect(nextPropertyId);
              }
            }}
          >
            <Select.Trigger
              className="w-full border-b border-outline-variant/30 bg-transparent pb-2 shadow-none data-[hover=true]:bg-transparent"
              data-testid="token-registry-property-select"
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-surface-container-lowest text-xs font-bold text-primary">
                    {getPropertyInitials(selectedProperty?.propertyTitle ?? "—")}
                  </div>
                  <div className="text-left">
                    <p className="font-headline text-lg font-bold">
                      {selectedProperty?.propertyTitle ?? "—"}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      {selectedProperty?.propertyId ?? "—"}
                    </p>
                  </div>
                </div>
                <Icon name="expand_more" className="text-on-surface-variant" />
              </div>
            </Select.Trigger>
            <Select.Popover>
              <ListBox items={items}>
                {(item) => (
                  <ListBoxItem id={item.id} textValue={item.label}>
                    <div>
                      <p className="text-sm font-semibold">{item.label}</p>
                      <p className="text-xs text-on-surface-variant">{item.propertyId}</p>
                    </div>
                  </ListBoxItem>
                )}
              </ListBox>
            </Select.Popover>
          </Select>
        )}
      </div>

      <div className="mt-8 flex gap-4 text-xs">
        <div className="rounded bg-tertiary/10 px-2 py-1 font-bold uppercase tracking-tighter text-tertiary">
          Verified
        </div>
        <div className="rounded bg-secondary/10 px-2 py-1 font-bold uppercase tracking-tighter text-secondary">
          Fully Minted
        </div>
      </div>
    </div>
  );
};
