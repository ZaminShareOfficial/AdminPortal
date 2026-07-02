export type CountryDialCode = {
  isoCode: string;
  name: string;
  dialCode: string;
  flag: string;
};

export const DEFAULT_COUNTRY_ISO = "IN";

export const COUNTRY_DIAL_CODES: CountryDialCode[] = [
  { isoCode: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { isoCode: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { isoCode: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { isoCode: "AE", name: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪" },
  { isoCode: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
  { isoCode: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { isoCode: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { isoCode: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { isoCode: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { isoCode: "SA", name: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦" },
  { isoCode: "QA", name: "Qatar", dialCode: "+974", flag: "🇶🇦" },
  { isoCode: "KW", name: "Kuwait", dialCode: "+965", flag: "🇰🇼" },
  { isoCode: "OM", name: "Oman", dialCode: "+968", flag: "🇴🇲" },
  { isoCode: "BH", name: "Bahrain", dialCode: "+973", flag: "🇧🇭" },
  { isoCode: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾" },
  { isoCode: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { isoCode: "CN", name: "China", dialCode: "+86", flag: "🇨🇳" },
  { isoCode: "NZ", name: "New Zealand", dialCode: "+64", flag: "🇳🇿" }
];

export const getCountryByIso = (isoCode: string): CountryDialCode =>
  COUNTRY_DIAL_CODES.find((country) => country.isoCode === isoCode) ??
  COUNTRY_DIAL_CODES[0];
