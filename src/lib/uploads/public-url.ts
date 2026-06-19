export const resolvePublicUrl = (request: Request, publicPath: string) => {
  const configuredOrigin = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/+$/, "");
  if (configuredOrigin) {
    return `${configuredOrigin}${publicPath}`;
  }

  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "http";

  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}${publicPath}`;
  }

  return new URL(publicPath, request.url).toString();
};
