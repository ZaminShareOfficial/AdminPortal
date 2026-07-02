type AuthErrorBannerProps = {
  message: string;
};

export const AuthErrorBanner = ({ message }: AuthErrorBannerProps) => (
  <div
    className="rounded-md border border-error/20 bg-error/10 px-3.5 py-2.5 text-sm text-error"
    role="alert"
    data-testid="auth-error-banner"
  >
    {message}
  </div>
);
