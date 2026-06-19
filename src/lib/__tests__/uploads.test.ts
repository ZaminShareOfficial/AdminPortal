import { describe, expect, it } from "vitest";
import { appendToUrlList, formatUrlList, parseUrlList } from "@/lib/url-list";
import { sanitizeFileName } from "@/lib/uploads/storage";
import { validateUploadFile } from "@/lib/uploads/validate";

const createFile = (name: string, type: string, size = 8) =>
  new File([new Uint8Array(size)], name, { type });

describe("url list helpers", () => {
  it("parses newline-separated URLs", () => {
    expect(parseUrlList("https://a.com\n\nhttps://b.com ")).toEqual([
      "https://a.com",
      "https://b.com"
    ]);
  });

  it("appends uploaded URLs without duplicates in formatting", () => {
    expect(
      appendToUrlList("https://a.com", ["https://b.com", "https://c.com"]),
    ).toBe("https://a.com\nhttps://b.com\nhttps://c.com");
  });

  it("formats URL arrays as newline-separated text", () => {
    expect(formatUrlList(["https://a.com", "https://b.com"])).toBe(
      "https://a.com\nhttps://b.com",
    );
  });
});

describe("upload validation", () => {
  it("accepts allowed photo files", () => {
    expect(() =>
      validateUploadFile(createFile("front.jpg", "image/jpeg"), "photos"),
    ).not.toThrow();
  });

  it("rejects unsupported document types", () => {
    expect(() =>
      validateUploadFile(createFile("notes.txt", "text/plain"), "documents"),
    ).toThrow(/not an allowed documents file type/i);
  });

  it("sanitizes unsafe file names", () => {
    expect(sanitizeFileName("my file (1).pdf")).toBe("my_file__1_.pdf");
  });
});
