export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "mie" | "nasi" | "sayuran";
  image: string;
};

export const menuItems: MenuItem[] = [
  {
    id: "mie-tiaw",
    name: "Mie Tiaw Goreng",
    description: "Mie tiaw dengan bumbu khas Surabaya, sayuran segar, dan telur",
    price: 28000,
    category: "mie",
    image: "/images/mie-tiaw.jpg",
  },
  {
    id: "mie-goreng",
    name: "Mie Goreng Spesial",
    description: "Mie goreng dengan topping ayam, bakso, dan pangsit goreng",
    price: 30000,
    category: "mie",
    image: "/images/mie-goreng.jpg",
  },
  {
    id: "nasi-goreng",
    name: "Nasi Goreng Surabaya",
    description: "Nasi goreng dengan bumbu petis khas Surabaya, telur, dan kerupuk",
    price: 25000,
    category: "nasi",
    image: "/images/nasi-goreng.jpg",
  },
  {
    id: "nasi-goreng-seafood",
    name: "Nasi Goreng Seafood",
    description: "Nasi goreng dengan udang, cumi, dan sayuran segar",
    price: 35000,
    category: "nasi",
    image: "/images/nasi-goreng-seafood.jpg",
  },
  {
    id: "capcay-goreng",
    name: "Capcay Goreng",
    description: "Aneka sayuran segar dimasak dengan bumbu spesial",
    price: 22000,
    category: "sayuran",
    image: "/images/capcay-goreng.jpg",
  },
  {
    id: "capcay-kuah",
    name: "Capcay Kuah",
    description: "Capcay dengan kuah gurih dan sayuran melimpah",
    price: 22000,
    category: "sayuran",
    image: "/images/capcay-kuah.jpg",
  },
  {
    id: "mie-tiaw-kuah",
    name: "Mie Tiaw Kuah",
    description: "Mie tiaw dengan kuah kaldu gurih dan topping lengkap",
    price: 28000,
    category: "mie",
    image: "/images/mie-tiaw-kuah.jpg",
  },
  {
    id: "nasi-goreng-kampung",
    name: "Nasi Goreng Kampung",
    description: "Nasi goreng sederhana dengan teri, petai, dan sambal terasi",
    price: 23000,
    category: "nasi",
    image: "/images/nasi-goreng-kampung.jpg",
  },
];
