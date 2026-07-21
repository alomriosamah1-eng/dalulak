export function formatNumber(num: number): string {
  try {
    return new Intl.NumberFormat('ar-EG').format(num);
  } catch {
    return num.toString();
  }
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '…';
}
