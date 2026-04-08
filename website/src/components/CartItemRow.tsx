"use client";

import { useCart, type CartItem } from "../context/CartContext";
import { formatRupiah } from "../lib/formatRupiah";
import { getMenuVisual } from "../lib/menuVisuals";

type CartItemRowProps = {
  item: CartItem;
};

export default function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCart();
  const visual = getMenuVisual(item.id);

  return (
    <div className="grid gap-4 rounded-[28px] border border-brand-brown/10 bg-white p-4 shadow-sm sm:grid-cols-[1.6fr_1fr] sm:p-5 lg:grid-cols-[2fr_1fr_1fr_auto] lg:items-center">
      <div className="flex items-center gap-4">
        <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br ${visual.gradient} text-4xl`}>
          {visual.emoji}
        </div>
        <div>
          <h3 className="text-lg font-bold text-brand-brown">{item.name}</h3>
          <p className="mt-1 text-sm text-brand-brown/65">Harga satuan {formatRupiah(item.price)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-full bg-brand-cream p-1 sm:max-w-[180px] lg:justify-self-center">
        <button
          type="button"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-semibold text-brand-brown transition hover:bg-brand-maroon hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={`Kurangi jumlah ${item.name}`}
          disabled={item.quantity === 1}
        >
          −
        </button>
        <span className="text-base font-bold text-brand-brown">{item.quantity}</span>
        <button
          type="button"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-semibold text-brand-brown transition hover:bg-brand-maroon hover:text-white"
          aria-label={`Tambah jumlah ${item.name}`}
        >
          +
        </button>
      </div>

      <div>
        <p className="text-sm text-brand-brown/65">Subtotal</p>
        <p className="text-lg font-black text-brand-maroon">{formatRupiah(item.price * item.quantity)}</p>
      </div>

      <button
        type="button"
        onClick={() => removeItem(item.id)}
        className="inline-flex items-center justify-center rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
      >
        🗑️ Hapus
      </button>
    </div>
  );
}
