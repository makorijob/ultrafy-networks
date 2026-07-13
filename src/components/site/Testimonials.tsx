type Testimonial = {
  id: number;
  name: string;
  role: string | null;
  message: string;
  imageUrl: string | null;
  rating: number;
};

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-4 py-20">
      <p className="eyebrow text-center">Testimonials</p>
      <h2 className="section-heading mt-2 text-center">What our clients say</h2>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.id} className="glass rounded-2xl p-6">
            <div className="mb-3 font-mono text-signal-red">{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</div>
            <p className="text-sm text-ink/70">&ldquo;{t.message}&rdquo;</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-signal-blue/10">
                {t.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.imageUrl} alt={t.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full w-full place-items-center font-display text-sm font-bold text-signal-blue">
                    {t.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">{t.name}</p>
                {t.role && <p className="text-xs text-ink/50">{t.role}</p>}
              </div>
            </div>
          </div>
        ))}

        {testimonials.length === 0 && (
          <p className="col-span-full text-center text-sm text-ink/50">
            Client testimonials will appear here once added in the admin panel.
          </p>
        )}
      </div>
    </section>
  );
}
