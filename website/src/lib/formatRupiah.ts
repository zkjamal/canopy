export function formatRupiah(price: number): string {
  return `Rp ${new Intl.NumberFormat("id-ID").format(price)}`;
}
