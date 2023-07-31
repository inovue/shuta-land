export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit", day: "2-digit"}).replaceAll('/', '-')
}
