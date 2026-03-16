const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export function formatMilliunits(milliunits: number): string {
  return currencyFormatter.format(milliunits / 1000);
}

export function formatDollars(dollars: number): string {
  return currencyFormatter.format(dollars);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatMonth(monthStr: string): string {
  const date = new Date(monthStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}
