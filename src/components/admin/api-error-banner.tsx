type ApiErrorBannerProps = {
  message: string;
};

export function ApiErrorBanner({ message }: ApiErrorBannerProps) {
  return (
    <div
      role="alert"
      className="border border-error/30 bg-error-container/10 px-4 py-3 text-sm text-error"
    >
      {message}
    </div>
  );
}
