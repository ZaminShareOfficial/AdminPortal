export const parseUrlList = (value: string): string[] =>
  value
    .split(/\r?\n/)
    .map((entry) => entry.trim())
    .filter(Boolean);

export const formatUrlList = (urls: string[]): string =>
  urls.filter(Boolean).join("\n");

export const appendToUrlList = (current: string, urls: string[]): string =>
  formatUrlList([...parseUrlList(current), ...urls]);
