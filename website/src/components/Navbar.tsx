"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/menu", label: "Menu" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-brown/10 bg-[#fff8f0]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-amber to-brand-red text-xl text-white shadow-soft">
            🍜
          </span>
          <div>
            <p className="text-lg font-black tracking-tight text-brand-brown">Bakmi Surabaya</p>
            <p className="text-xs text-brand-brown/70">Hangat, gurih, dan selalu bikin rindu</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-brand-maroon text-white"
                    : "text-brand-brown hover:bg-brand-brown/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-brown/10 bg-white text-xl text-brand-brown transition hover:-translate-y-0.5 hover:border-brand-maroon/20 hover:text-brand-maroon"
            aria-label="Buka keranjang"
          >
            🛒
            <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1 text-[11px] font-bold text-white">
              {totalItems}
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-brown/10 bg-white text-brand-brown md:hidden"
            aria-label="Buka menu navigasi"
            aria-expanded={isOpen}
          >
            <span className="text-xl">☰</span>
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-brand-brown/10 bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-brand-maroon text-white"
                      : "bg-brand-cream text-brand-brown hover:bg-brand-brown/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
