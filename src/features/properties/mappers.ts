import type {
  CreatePropertyRequest,
  PropertyResponse,
  UpdatePropertyRequest
} from "@/types/backend";
import {
  LATITUDE_MAX,
  LATITUDE_MIN,
  LONGITUDE_MAX,
  LONGITUDE_MIN
} from "@/constants/property";
import { parseInrInput, parseInrToPaise } from "@/lib/format";
import { parsePropertyType } from "@/lib/validators/property";
import type {
  PropertyCreateFormValues,
  PropertyFormFieldErrors
} from "@/features/properties/types";

const urlListToText = (values?: string[] | null) =>
  values?.filter(Boolean).join("\n") ?? "";

export const emptyPropertyForm = (): PropertyCreateFormValues => ({
  title: "",
  location: "",
  valuation: "",
  tokenSupply: "",
  tokenPrice: "",
  latitude: "",
  longitude: "",
  photos: "",
  documents: "",
  listingBroker: "",
  propertyType: "RESIDENTIAL"
});

export const propertyToForm = (
  property: PropertyResponse,
): PropertyCreateFormValues => ({
  title: property.title,
  location: property.location,
  valuation: property.valuation != null ? String(property.valuation / 100) : "",
  tokenSupply:
    property.tokenSupply != null ? String(property.tokenSupply) : "",
  tokenPrice:
    property.tokenPrice != null ? String(property.tokenPrice / 100) : "",
  latitude:
    property.coordinates?.latitude != null
      ? String(property.coordinates.latitude)
      : "",
  longitude:
    property.coordinates?.longitude != null
      ? String(property.coordinates.longitude)
      : "",
  photos: urlListToText(property.photos),
  documents: urlListToText(property.documents),
  listingBroker: property.listingBroker ?? "",
  propertyType: property.propertyType ?? "RESIDENTIAL"
});

export const parseUrlList = (value: string): string[] =>
  value
    .split(/\r?\n/)
    .map((entry) => entry.trim())
    .filter(Boolean);

const parseCoordinate = (
  value: string,
  min: number,
  max: number,
  label: string,
): number | null => {
  if (!value.trim()) {
    return null;
  }

  const parsed = Number(value);
  if (Number.isNaN(parsed) || parsed < min || parsed > max) {
    throw new Error(`${label} must be between ${min} and ${max}.`);
  }

  return parsed;
};

export const parseCoordinates = (form: PropertyCreateFormValues) => {
  const latitude = parseCoordinate(
    form.latitude,
    LATITUDE_MIN,
    LATITUDE_MAX,
    "Latitude",
  );
  const longitude = parseCoordinate(
    form.longitude,
    LONGITUDE_MIN,
    LONGITUDE_MAX,
    "Longitude",
  );

  if (latitude == null && longitude == null) {
    return undefined;
  }

  if (latitude == null || longitude == null) {
    throw new Error("Provide both latitude and longitude.");
  }

  return { latitude, longitude };
};

const buildOptionalPayload = (form: PropertyCreateFormValues) => {
  const photos = parseUrlList(form.photos);
  const documents = parseUrlList(form.documents);
  const coordinates = parseCoordinates(form);

  return {
    photos: photos.length > 0 ? photos : undefined,
    documents: documents.length > 0 ? documents : undefined,
    coordinates,
    listingBroker: form.listingBroker.trim() || undefined,
    propertyType: parsePropertyType(form.propertyType)
  };
};

export const computeDerivedTokenPrice = (
  valuation: string,
  tokenSupply: string,
): string | null => {
  const valuationAmount = parseInrInput(valuation);
  const supply = Number(tokenSupply);

  if (valuationAmount == null || Number.isNaN(supply) || supply <= 0) {
    return null;
  }

  return (valuationAmount / supply).toFixed(2);
};

export const validatePropertyForm = (
  form: PropertyCreateFormValues,
): PropertyFormFieldErrors => {
  const errors: PropertyFormFieldErrors = {};

  if (!form.title.trim()) {
    errors.title = "Property title is required.";
  }

  if (!form.location.trim()) {
    errors.location = "Location is required.";
  }

  if (parseInrInput(form.valuation) == null) {
    errors.valuation = "Enter a valid valuation in INR.";
  }

  const tokenSupply = Number(form.tokenSupply);
  if (!form.tokenSupply.trim() || Number.isNaN(tokenSupply) || tokenSupply <= 0) {
    errors.tokenSupply = "Enter a valid token supply.";
  }

  if (parseInrInput(form.tokenPrice) == null) {
    errors.tokenPrice = "Enter a valid token price in INR.";
  }

  const hasLatitude = Boolean(form.latitude.trim());
  const hasLongitude = Boolean(form.longitude.trim());

  if (hasLatitude !== hasLongitude) {
    errors.latitude = "Provide both latitude and longitude.";
    errors.longitude = "Provide both latitude and longitude.";
  } else if (hasLatitude) {
    const latitude = Number(form.latitude);
    const longitude = Number(form.longitude);

    if (Number.isNaN(latitude) || latitude < LATITUDE_MIN || latitude > LATITUDE_MAX) {
      errors.latitude = `Latitude must be between ${LATITUDE_MIN} and ${LATITUDE_MAX}.`;
    }

    if (
      Number.isNaN(longitude) ||
      longitude < LONGITUDE_MIN ||
      longitude > LONGITUDE_MAX
    ) {
      errors.longitude = `Longitude must be between ${LONGITUDE_MIN} and ${LONGITUDE_MAX}.`;
    }
  }

  return errors;
};

export const formToCreatePayload = (
  form: PropertyCreateFormValues,
): CreatePropertyRequest => {
  const valuation = parseInrToPaise(form.valuation);
  const tokenPrice = parseInrToPaise(form.tokenPrice);
  const tokenSupply = Number(form.tokenSupply);

  if (!form.title.trim() || !form.location.trim()) {
    throw new Error("Title and location are required.");
  }
  if (valuation == null || tokenPrice == null || Number.isNaN(tokenSupply)) {
    throw new Error("Valuation, token supply, and token price are required.");
  }

  return {
    title: form.title.trim(),
    location: form.location.trim(),
    valuation,
    tokenSupply,
    tokenPrice,
    ...buildOptionalPayload(form)
  };
};

export const formToUpdatePayload = (
  form: PropertyCreateFormValues,
): UpdatePropertyRequest => {
  const valuation = parseInrToPaise(form.valuation);
  const tokenPrice = parseInrToPaise(form.tokenPrice);
  const tokenSupply = Number(form.tokenSupply);

  return {
    title: form.title.trim(),
    location: form.location.trim(),
    valuation: valuation ?? undefined,
    tokenSupply: Number.isNaN(tokenSupply) ? undefined : tokenSupply,
    tokenPrice: tokenPrice ?? undefined,
    ...buildOptionalPayload(form)
  };
};
