export default function Footer() {
  return (
    <footer className="border-t border-brand-brown/10 bg-brand-brown text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div className="space-y-3">
          <p className="text-xl font-black">Bakmi Surabaya</p>
          <p className="max-w-md text-sm text-white/75">
            Cita rasa mie dan nasi goreng khas Surabaya yang dimasak segar setiap hari untuk makan siang dan makan malam Anda.
          </p>
        </div>
        <div className="space-y-3 text-sm text-white/80">
          <p className="font-semibold text-white">Informasi</p>
          <p>Jl. Contoh No. 123, Surabaya</p>
          <p>0812-3456-7890</p>
        </div>
        <div className="space-y-3 text-sm text-white/80">
          <p className="font-semibold text-white">Ikuti Kami</p>
          <div className="flex gap-3">
            {[
              { label: "Instagram", short: "IG" },
              { label: "TikTok", short: "TT" },
              { label: "WhatsApp", short: "WA" },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 font-semibold transition hover:-translate-y-0.5 hover:bg-white/20"
                aria-label={social.label}
              >
                {social.short}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-sm text-white/65">
        © 2024 Bakmi Surabaya
      </div>
    </footer>
  );
}
