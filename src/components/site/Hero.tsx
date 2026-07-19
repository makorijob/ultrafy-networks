"use client";

import { useEffect, useState } from "react";
import HeroBackground from "./HeroBackground";

type Slide = {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string | null;
};

export default function Hero({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, [slides.length]);

  const current = slides[index];

  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-10">
      {/* Signature: rotating 3D globe, fiber-optic pulses, floating data particles */}
      <HeroBackground />

      <div className="relative mx-auto mt-8 grid max-w-6xl gap-10 px-4 lg:grid-cols-[1.1fr,1fr] lg:items-center">
        <div className="animate-fadein">
          <p className="eyebrow">Ultrafy Networks · Your Trusted Internet Provider</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
            {current?.title ?? "Reliable Connectivity, Built for Thika"}
          </h1>
          <p className="mt-4 max-w-lg text-base text-ink/70">
            {current?.subtitle ?? "Fiber and wireless internet, CCTV, access control, solar and electric fencing — installed and supported by a local team."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#packages" className="btn-primary">
              View Packages
            </a>
            <a href="https://wa.me/254703199691" target="_blank" className="btn-secondary">
              Chat on WhatsApp
            </a>
          </div>

          {slides.length > 1 && (
            <div className="mt-8 flex gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  aria-label={`Show slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-signal-green" : "w-3 bg-slate-300"}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="glass-strong relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
          {slides.map((s, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={s.id}
              src={s.imageUrl}
              alt={s.title}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          {slides.length === 0 && (
            <div className="grid h-full w-full place-items-center bg-gradient-to-br from-signal-blue/10 to-signal-green/10 text-sm text-ink/50">
              Hero images will appear here once added in the admin panel
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
