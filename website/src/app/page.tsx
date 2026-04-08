import Link from "next/link";
import MenuCard from "../components/MenuCard";
import { menuItems } from "../data/menu";

const featuredItems = menuItems.slice(0, 4);

export default function HomePage() {
  return (
    <div className="pb-16">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.25))]" />
        <div className="absolute left-0 top-0 h-72 w-72 -translate-x-20 -translate-y-16 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-20 translate-y-16 rounded-full bg-amber-300/20 blur-3xl" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 py-20 text-white sm:px-6 md:py-28 lg:flex-row lg:items-center lg:px-8">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
              Kuliner Surabaya, praktis dipesan online
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Bakmi Surabaya
              </h1>
              <p className="max-w-xl text-lg text-white/85 sm:text-xl">
                Cita Rasa Surabaya, Langsung ke Meja Anda.
              </p>
              <p className="max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                Nikmati mie goreng, nasi goreng, dan capcay hangat dengan bumbu khas yang kaya rasa, cocok untuk makan bersama keluarga maupun pesanan harian kantor.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center rounded-full bg-brand-amber px-7 py-3.5 text-sm font-bold text-brand-brown transition hover:-translate-y-0.5 hover:bg-[#e8b93d]"
              >
                Lihat Menu
              </Link>
              <Link
                href="/cart"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                Buka Keranjang
              </Link>
            </div>
          </div>

          <div className="grid flex-1 gap-4 sm:grid-cols-2">
            {[
              "Mie gurih dimasak mendadak",
              "Pilihan nasi goreng favorit keluarga",
              "Sayuran segar dengan bumbu ringan",
              "Pesan online cepat via website",
            ].map((point, index) => (
              <div
                key={point}
                className={`rounded-[28px] border border-white/15 bg-white/10 p-5 backdrop-blur-sm ${
                  index % 2 === 0 ? "sm:translate-y-6" : ""
                }`}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-200">
                  Keunggulan
                </p>
                <p className="mt-3 text-lg font-semibold leading-7">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-red/75">
              Pilihan Favorit
            </p>
            <h2 className="mt-3 text-3xl font-black text-brand-brown sm:text-4xl">
              Menu yang paling sering dipesan
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center text-sm font-semibold text-brand-maroon transition hover:text-brand-red"
          >
            Lihat semua menu →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              showDescription={false}
              showQuantitySelector={false}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="rounded-[32px] bg-white p-8 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-red/75">
            Tentang Kami
          </p>
          <h2 className="mt-3 text-3xl font-black text-brand-brown">Racikan khas Surabaya yang akrab di lidah</h2>
          <p className="mt-5 text-base leading-8 text-brand-brown/75">
            Bakmi Surabaya menghadirkan cita rasa autentik mie goreng, mie kuah, nasi goreng, dan capcay dengan sentuhan bumbu khas Jawa Timur. Setiap pesanan dimasak segar agar aroma rempah, tekstur mie, dan gurihnya nasi tetap maksimal sampai tiba di meja Anda.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { title: "Bumbu khas", text: "Rasa gurih-manis dengan sentuhan petis dan rempah lokal." },
            { title: "Masak segar", text: "Semua menu disiapkan saat dipesan untuk menjaga kualitas." },
            { title: "Porsi pas", text: "Cocok untuk santap sendiri maupun makan bersama keluarga." },
            { title: "Pengiriman cepat", text: "Siap antar ke area Surabaya dan sekitarnya." },
          ].map((feature) => (
            <div key={feature.title} className="rounded-[28px] border border-brand-brown/10 bg-brand-cream p-6">
              <h3 className="text-lg font-bold text-brand-brown">{feature.title}</h3>
              <p className="mt-2 text-sm leading-7 text-brand-brown/70">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
