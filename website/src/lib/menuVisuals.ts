const visualMap: Record<string, { emoji: string; gradient: string }> = {
  "mie-tiaw": { emoji: "🍜", gradient: "from-orange-200 via-amber-300 to-red-300" },
  "mie-goreng": { emoji: "🥢", gradient: "from-amber-200 via-orange-300 to-rose-300" },
  "nasi-goreng": { emoji: "🍛", gradient: "from-yellow-200 via-orange-300 to-red-300" },
  "nasi-goreng-seafood": { emoji: "🦐", gradient: "from-orange-200 via-red-300 to-pink-300" },
  "capcay-goreng": { emoji: "🥬", gradient: "from-lime-200 via-green-300 to-emerald-300" },
  "capcay-kuah": { emoji: "🥦", gradient: "from-emerald-200 via-green-300 to-teal-300" },
  "mie-tiaw-kuah": { emoji: "🍲", gradient: "from-amber-200 via-orange-300 to-yellow-300" },
  "nasi-goreng-kampung": { emoji: "🌶️", gradient: "from-yellow-200 via-amber-300 to-orange-300" },
};

export function getMenuVisual(id: string) {
  return visualMap[id] ?? { emoji: "🍽️", gradient: "from-stone-200 via-orange-200 to-amber-200" };
}
