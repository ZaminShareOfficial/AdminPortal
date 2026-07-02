import { getCountryByIso } from "@/constants/countries";

export const E164_MOBILE_PATTERN = /^\+[1-9]\d{1,14}$/;

export const sanitizeLocalMobileNumber = (value: string) =>
  value.replace(/\D/g, "");

export const buildE164MobileNumber = (
  countryIso: string,
  localNumber: string
) => {
  const digits = sanitizeLocalMobileNumber(localNumber);
  if (!digits) {
    return "";
  }

  const { dialCode } = getCountryByIso(countryIso);
  return `${dialCode}${digits}`;
};

export const isValidE164MobileNumber = (value: string) =>
  E164_MOBILE_PATTERN.test(value);

export const INVALID_MOBILE_NUMBER_MESSAGE =
  "Use a valid mobile number for the selected country.";
