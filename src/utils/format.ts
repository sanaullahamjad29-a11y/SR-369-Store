export function money(n: number | string): string {
  return Number(n).toLocaleString("en-PK", { style: "currency", currency: "PKR" });
}

export function initials(title: string): string {
  return title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}