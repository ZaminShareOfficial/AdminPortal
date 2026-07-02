export const AUTH = {
  UNAUTHORIZED_STATUS: 401,
  FORBIDDEN_STATUS: 403,
  ADMIN_ROLE: "ADMIN",
  OTP_LENGTH: 6,
  NOT_ADMIN_MESSAGE:
    "You are not an admin. Please contact your administrator for access."
} as const;

export const LOGIN_STEP_COPY = {
  mobile: "Enter your mobile number to receive a one-time code.",
  otp: "Enter the OTP we sent to your phone."
} as const;
