export type IdentityType = "PHONE_NUMBER" | "EMAIL";

const identityTypeSet = new Set<string>(["PHONE_NUMBER", "EMAIL"]);

export const parseIdentityType = (value: string): IdentityType => {
  if (!identityTypeSet.has(value)) {
    throw new Error("Invalid identity type.");
  }
  return value as IdentityType;
};
