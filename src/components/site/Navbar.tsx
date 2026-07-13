"use client";

import { useState } from "react";

const links = [
  { href: "#offerings", label: "What We Offer" },
  { href: "#packages", label: "Packages" },
  { href: "#careers", label: "Careers" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#invest", label: "Invest" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 sm:mx-4 lg:mx-auto">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-signal-blue to-signal-green font-display text-lg font-extrabold text-white">
            U
          </span>
          <span className="font-display text-lg font-bold text-ink">
            Ultrafy <span className="text-signal-green">Networks</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-ink/70 transition hover:text-signal-blue">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="tel:0703199691" className="font-mono text-sm text-ink/70 hover:text-signal-blue">
            0703 199 691
          </a>
          <a
            href="https://wa.me/254703199691"
            target="_blank"
            className="rounded-full bg-signal-green px-4 py-2 text-sm font-semibold text-white transition hover:bg-signal-greendark"
          >
            WhatsApp Us
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-4 bg-ink" />
        </button>
      </div>

      {open && (
        <div className="glass mx-4 mt-2 flex flex-col gap-1 rounded-2xl p-4 lg:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-ink/80 hover:bg-white/70">
              {l.label}
            </a>
          ))}
          <a href="tel:0703199691" className="rounded-lg px-3 py-2 font-mono text-sm text-ink/70">
            0703 199 691
          </a>
          <a href="https://wa.me/254703199691" target="_blank" className="mt-1 rounded-full bg-signal-green px-4 py-2 text-center text-sm font-semibold text-white">
            WhatsApp Us
          </a>
        </div>
      )}
    </header>
  );
}
