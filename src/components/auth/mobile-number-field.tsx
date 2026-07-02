"use client";

import {
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Select,
  TextField
} from "@heroui/react";
import { useMemo } from "react";

import {
  COUNTRY_DIAL_CODES,
  getCountryByIso
} from "@/constants/countries";
import { sanitizeLocalMobileNumber } from "@/lib/phone";

type MobileNumberFieldProps = {
  countryIso: string;
  localNumber: string;
  onCountryChange: (isoCode: string) => void;
  onLocalNumberChange: (localNumber: string) => void;
  error?: string;
  disabled?: boolean;
  id?: string;
};

export const MobileNumberField = ({
  countryIso,
  localNumber,
  onCountryChange,
  onLocalNumberChange,
  error,
  disabled,
  id = "login-mobile"
}: MobileNumberFieldProps) => {
  const selectedCountry = getCountryByIso(countryIso);
  const items = useMemo(
    () =>
      COUNTRY_DIAL_CODES.map((country) => ({
        id: country.isoCode,
        label: `${country.flag} ${country.name} (${country.dialCode})`,
        shortLabel: `${country.flag} ${country.dialCode}`
      })),
    []
  );

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>Mobile number</Label>
      <div className="flex gap-2">
        <Select
          aria-label="Country code"
          selectedKey={countryIso}
          isDisabled={disabled}
          onSelectionChange={(key) => {
            if (key == null) {
              return;
            }

            const nextIso = String(key);
            if (nextIso !== countryIso) {
              onCountryChange(nextIso);
            }
          }}
        >
          <Select.Trigger
            className="w-[7.5rem] shrink-0"
            data-testid="login-country-select"
          >
            <span className="text-sm font-medium">
              {selectedCountry.flag} {selectedCountry.dialCode}
            </span>
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox items={items}>
              {(item) => (
                <ListBoxItem id={item.id} textValue={item.label}>
                  {item.label}
                </ListBoxItem>
              )}
            </ListBox>
          </Select.Popover>
        </Select>

        <TextField
          name="localMobileNumber"
          value={localNumber}
          onChange={(value) =>
            onLocalNumberChange(sanitizeLocalMobileNumber(value))
          }
          isRequired
          isDisabled={disabled}
          className="min-w-0 flex-1"
        >
          <Input
            id={id}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="9876543210"
            data-testid="login-mobile-input"
          />
        </TextField>
      </div>
      <p className="text-sm text-error">{error ?? " "}</p>
    </div>
  );
};
