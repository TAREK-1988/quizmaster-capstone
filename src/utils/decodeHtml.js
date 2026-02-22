export function decodeHtml(input) {
  const str = String(input ?? "");
  const doc = new DOMParser().parseFromString(str, "text/html");
  return doc.documentElement.textContent || "";
}
