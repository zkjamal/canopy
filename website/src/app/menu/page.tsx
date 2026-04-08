"use client";

import { useMemo, useState } from "react";
import CategoryFilter from "../../components/CategoryFilter";
import MenuCard from "../../components/MenuCard";
import { menuItems } from "../../data/menu";

type CategoryValue = "semua" | "mie" | "nasi" | "sayuran";

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryValue>("semua");

  const filteredItems = useMemo(() => {
    if (selectedCategory === "semua") {
      return menuItems;
    }

    return menuItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-red/75">
            Menu Kami
          </p>
          <h1 className="mt-3 text-4xl font-black text-brand-brown">Pilihan hangat untuk setiap selera</h1>
          <p className="mt-3 max-w-2xl text-base leading-8 text-brand-brown/75">
            Pilih mie, nasi, atau sayuran favorit Anda. Semua menu disiapkan segar dan siap dikirim ke rumah.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <CategoryFilter selectedCategory={selectedCategory} onChange={setSelectedCategory} />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredItems.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
