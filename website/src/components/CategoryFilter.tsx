"use client";

type CategoryValue = "semua" | "mie" | "nasi" | "sayuran";

type CategoryFilterProps = {
  selectedCategory: CategoryValue;
  onChange: (category: CategoryValue) => void;
};

const categories: { label: string; value: CategoryValue }[] = [
  { label: "Semua", value: "semua" },
  { label: "Mie", value: "mie" },
  { label: "Nasi", value: "nasi" },
  { label: "Sayuran", value: "sayuran" },
];

export default function CategoryFilter({ selectedCategory, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const isActive = selectedCategory === category.value;

        return (
          <button
            key={category.value}
            type="button"
            onClick={() => onChange(category.value)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              isActive
                ? "bg-brand-maroon text-white shadow-soft"
                : "border border-brand-brown/10 bg-white text-brand-brown hover:border-brand-maroon/20 hover:text-brand-maroon"
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
