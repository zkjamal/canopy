"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../../context/CartContext";
import { formatRupiah } from "../../lib/formatRupiah";
import { getMenuVisual } from "../../lib/menuVisuals";

const DELIVERY_FEE = 10000;

type PaymentMethod = "transfer" | "cod";

type FormState = {
  name: string;
  phone: string;
  address: string;
  note: string;
  payment: PaymentMethod;
};

type FormErrors = Partial<Record<keyof Omit<FormState, "payment" | "note">, string>>;

type SuccessOrder = {
  items: ReturnType<typeof useCart>["items"];
  customer: FormState;
  subtotal: number;
  total: number;
};

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successOrder, setSuccessOrder] = useState<SuccessOrder | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    address: "",
    note: "",
    payment: "transfer",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = useMemo(() => totalPrice + DELIVERY_FEE, [totalPrice]);

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Nama lengkap wajib diisi.";
    }

    if (!/^08\d{8,13}$/.test(form.phone.trim())) {
      nextErrors.phone = "Nomor WhatsApp harus diawali 08 dan berisi 10-15 digit.";
    }

    if (!form.address.trim()) {
      nextErrors.address = "Alamat pengiriman wajib diisi.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (items.length === 0 || !validateForm()) {
      return;
    }

    const snapshotItems = items.map((item) => ({ ...item }));

    setSuccessOrder({
      items: snapshotItems,
      customer: form,
      subtotal: totalPrice,
      total,
    });
    clearCart();
  };

  if (!mounted) {
    return <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">Memuat checkout...</section>;
  }

  if (successOrder) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-emerald-200 bg-white p-8 shadow-soft sm:p-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
            🎉
          </div>
          <h1 className="mt-6 text-4xl font-black text-brand-brown">Pesanan Berhasil! 🎉</h1>
          <p className="mt-3 text-base leading-8 text-brand-brown/75">
            Kami akan menghubungi Anda via WhatsApp untuk konfirmasi pesanan.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[28px] bg-brand-cream p-6">
              <h2 className="text-xl font-bold text-brand-brown">Ringkasan Pesanan</h2>
              <div className="mt-4 space-y-4">
                {successOrder.items.map((item) => {
                  const visual = getMenuVisual(item.id);

                  return (
                    <div key={item.id} className="flex items-center gap-4 rounded-2xl bg-white p-4">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${visual.gradient} text-2xl`}>
                        {visual.emoji}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-brand-brown">{item.name}</p>
                        <p className="text-sm text-brand-brown/60">
                          {item.quantity} x {formatRupiah(item.price)}
                        </p>
                      </div>
                      <p className="font-bold text-brand-maroon">
                        {formatRupiah(item.price * item.quantity)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[28px] border border-brand-brown/10 bg-white p-6">
              <h2 className="text-xl font-bold text-brand-brown">Detail Pengiriman</h2>
              <div className="mt-4 space-y-3 text-sm text-brand-brown/75">
                <p>
                  <span className="font-semibold text-brand-brown">Nama:</span> {successOrder.customer.name}
                </p>
                <p>
                  <span className="font-semibold text-brand-brown">WhatsApp:</span> {successOrder.customer.phone}
                </p>
                <p>
                  <span className="font-semibold text-brand-brown">Alamat:</span> {successOrder.customer.address}
                </p>
                <p>
                  <span className="font-semibold text-brand-brown">Pembayaran:</span>{" "}
                  {successOrder.customer.payment === "transfer" ? "Transfer Bank" : "COD (Bayar di Tempat)"}
                </p>
                {successOrder.customer.note ? (
                  <p>
                    <span className="font-semibold text-brand-brown">Catatan:</span> {successOrder.customer.note}
                  </p>
                ) : null}
              </div>

              <div className="mt-6 space-y-3 rounded-2xl bg-brand-cream p-4 text-sm">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatRupiah(successOrder.subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Ongkir</span>
                  <span className="font-semibold">{formatRupiah(DELIVERY_FEE)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-brand-brown/10 pt-3 text-base font-black text-brand-brown">
                  <span>Total</span>
                  <span className="text-brand-maroon">{formatRupiah(successOrder.total)}</span>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-maroon px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-red"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white text-5xl shadow-soft">
          📦
        </div>
        <h1 className="mt-8 text-4xl font-black text-brand-brown">Checkout</h1>
        <p className="mt-4 text-lg text-brand-brown/75">Belum ada pesanan untuk diproses</p>
        <Link
          href="/menu"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-maroon px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-red"
        >
          Lihat Menu
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-red/75">Checkout</p>
        <h1 className="mt-3 text-4xl font-black text-brand-brown">Lengkapi detail pengiriman Anda</h1>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-[32px] border border-brand-brown/10 bg-white p-6 shadow-soft sm:p-8">
          <h2 className="text-2xl font-black text-brand-brown">Data Pemesan</h2>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-brand-brown">
                Nama Lengkap
              </label>
              <input
                id="name"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                className="w-full rounded-2xl border border-brand-brown/10 bg-brand-cream px-4 py-3 text-sm outline-none transition focus:border-brand-maroon focus:bg-white"
              />
              {errors.name ? <p className="mt-2 text-sm text-red-600">{errors.name}</p> : null}
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-brand-brown">
                Nomor WhatsApp
              </label>
              <input
                id="phone"
                placeholder="08xxxxxxxxxx"
                value={form.phone}
                onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                className="w-full rounded-2xl border border-brand-brown/10 bg-brand-cream px-4 py-3 text-sm outline-none transition focus:border-brand-maroon focus:bg-white"
              />
              {errors.phone ? <p className="mt-2 text-sm text-red-600">{errors.phone}</p> : null}
            </div>

            <div>
              <label htmlFor="address" className="mb-2 block text-sm font-semibold text-brand-brown">
                Alamat Pengiriman
              </label>
              <textarea
                id="address"
                rows={4}
                value={form.address}
                onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
                className="w-full rounded-2xl border border-brand-brown/10 bg-brand-cream px-4 py-3 text-sm outline-none transition focus:border-brand-maroon focus:bg-white"
              />
              {errors.address ? <p className="mt-2 text-sm text-red-600">{errors.address}</p> : null}
            </div>

            <div>
              <label htmlFor="note" className="mb-2 block text-sm font-semibold text-brand-brown">
                Catatan Tambahan
              </label>
              <textarea
                id="note"
                rows={3}
                value={form.note}
                onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))}
                className="w-full rounded-2xl border border-brand-brown/10 bg-brand-cream px-4 py-3 text-sm outline-none transition focus:border-brand-maroon focus:bg-white"
              />
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-brand-brown">Metode Pembayaran</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition ${form.payment === "transfer" ? "border-brand-maroon bg-brand-cream text-brand-maroon" : "border-brand-brown/10 bg-white text-brand-brown/75"}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="transfer"
                    checked={form.payment === "transfer"}
                    onChange={() => setForm((current) => ({ ...current, payment: "transfer" }))}
                  />
                  Transfer Bank
                </label>
                <label className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition ${form.payment === "cod" ? "border-brand-maroon bg-brand-cream text-brand-maroon" : "border-brand-brown/10 bg-white text-brand-brown/75"}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={form.payment === "cod"}
                    onChange={() => setForm((current) => ({ ...current, payment: "cod" }))}
                  />
                  COD (Bayar di Tempat)
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-brand-maroon px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-red"
            >
              Pesan Sekarang
            </button>
          </form>
        </div>

        <aside className="h-fit rounded-[32px] border border-brand-brown/10 bg-white p-6 shadow-soft lg:sticky lg:top-28">
          <h2 className="text-2xl font-black text-brand-brown">Ringkasan Pesanan</h2>
          <div className="mt-6 space-y-4">
            {items.map((item) => {
              const visual = getMenuVisual(item.id);

              return (
                <div key={item.id} className="flex items-center gap-4 rounded-2xl bg-brand-cream p-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${visual.gradient} text-2xl`}>
                    {visual.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-brand-brown">{item.name}</p>
                    <p className="text-sm text-brand-brown/60">
                      {item.quantity} x {formatRupiah(item.price)}
                    </p>
                  </div>
                  <p className="font-bold text-brand-maroon">
                    {formatRupiah(item.price * item.quantity)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 space-y-3 border-t border-dashed border-brand-brown/15 pt-6 text-sm text-brand-brown/80">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-brand-brown">{formatRupiah(totalPrice)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Estimasi ongkir</span>
              <span className="font-semibold text-brand-brown">{formatRupiah(DELIVERY_FEE)}</span>
            </div>
            <div className="flex items-center justify-between text-base font-black text-brand-brown">
              <span>Total</span>
              <span className="text-brand-maroon">{formatRupiah(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
