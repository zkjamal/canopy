"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CartItemRow from "../../components/CartItemRow";
import { useCart } from "../../context/CartContext";
import { formatRupiah } from "../../lib/formatRupiah";

const DELIVERY_FEE = 10000;

export default function CartPage() {
  const { items, totalPrice } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">Memuat keranjang...</section>;
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white text-5xl shadow-soft">
          🛒
        </div>
        <h1 className="mt-8 text-4xl font-black text-brand-brown">Keranjang Belanja</h1>
        <p className="mt-4 text-lg text-brand-brown/75">Keranjang kosong</p>
        <p className="mt-2 max-w-xl text-sm leading-7 text-brand-brown/65">
          Belum ada menu yang ditambahkan. Yuk pilih hidangan favorit Anda dari Bakmi Surabaya.
        </p>
        <Link
          href="/menu"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-maroon px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-red"
        >
          Lihat Menu
        </Link>
      </section>
    );
  }

  const totalWithDelivery = totalPrice + DELIVERY_FEE;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-red/75">Pesanan Anda</p>
        <h1 className="mt-3 text-4xl font-black text-brand-brown">Keranjang Belanja</h1>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.55fr_0.95fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </div>

        <aside className="h-fit rounded-[32px] border border-brand-brown/10 bg-white p-6 shadow-soft lg:sticky lg:top-28">
          <h2 className="text-2xl font-black text-brand-brown">Ringkasan Pesanan</h2>
          <div className="mt-6 space-y-4 text-sm text-brand-brown/80">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-brand-brown">{formatRupiah(totalPrice)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Estimasi ongkir</span>
              <span className="font-semibold text-brand-brown">{formatRupiah(DELIVERY_FEE)}</span>
            </div>
            <div className="border-t border-dashed border-brand-brown/15 pt-4">
              <div className="flex items-center justify-between text-base font-black text-brand-brown">
                <span>Total</span>
                <span className="text-brand-maroon">{formatRupiah(totalWithDelivery)}</span>
              </div>
            </div>
          </div>

          <Link
            href="/checkout"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-maroon px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-red"
          >
            Lanjut ke Checkout
          </Link>
        </aside>
      </div>
    </section>
  );
}
