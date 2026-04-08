"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import type { MenuItem } from "../data/menu";
import { formatRupiah } from "../lib/formatRupiah";
import { getMenuVisual } from "../lib/menuVisuals";

type MenuCardProps = {
  item: MenuItem;
  showDescription?: boolean;
  showQuantitySelector?: boolean;
};

export default function MenuCard({
  item,
  showDescription = true,
  showQuantitySelector = true,
}: MenuCardProps) {
  const { addItem, items, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const visual = getMenuVisual(item.id);

  const handleAddToCart = () => {
    const existingItem = items.find((cartItem) => cartItem.id === item.id);

    addItem(item);

    if (existingItem) {
      updateQuantity(item.id, existingItem.quantity + quantity);
    } else if (quantity > 1) {
      updateQuantity(item.id, quantity);
    }

    setQuantity(1);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-brand-brown/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className={`relative flex h-48 items-center justify-center bg-gradient-to-br ${visual.gradient}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent)]" />
        <span className="relative text-6xl drop-shadow-sm transition duration-300 group-hover:scale-110">
          {visual.emoji}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold text-brand-brown">{item.name}</h3>
            <span className="rounded-full bg-brand-cream px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-maroon">
              {item.category}
            </span>
          </div>
          {showDescription ? (
            <p className="line-clamp-2 text-sm text-brand-brown/70">{item.description}</p>
          ) : null}
        </div>

        <div className="mt-auto space-y-4 pt-5">
          <p className="text-xl font-black text-brand-maroon">{formatRupiah(item.price)}</p>

          {showQuantitySelector ? (
            <div className="flex items-center justify-between rounded-full bg-brand-cream p-1">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-semibold text-brand-brown transition hover:bg-brand-maroon hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={`Kurangi jumlah ${item.name}`}
                disabled={quantity === 1}
              >
                −
              </button>
              <span className="text-base font-bold text-brand-brown">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-semibold text-brand-brown transition hover:bg-brand-maroon hover:text-white"
                aria-label={`Tambah jumlah ${item.name}`}
              >
                +
              </button>
            </div>
          ) : null}

          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full rounded-full bg-brand-maroon px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-red active:scale-[0.99]"
          >
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </article>
  );
}
