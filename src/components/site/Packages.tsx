type Package = {
  id: number;
  name: string;
  speed: string;
  price: number;
  freeMonth: boolean;
  featured: boolean;
};

export default function Packages({ packages }: { packages: Package[] }) {
  return (
    <section id="packages" className="relative mx-auto max-w-6xl px-4 py-20">
      <p className="eyebrow text-center">Internet Packages</p>
      <h2 className="section-heading mt-2 text-center">Pick the speed that fits you</h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-ink/60">
        Transparent monthly pricing, no hidden fees. All prices in Kenyan Shillings (KES).
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((p) => (
          <div
            key={p.id}
            className={`relative flex flex-col rounded-2xl p-8 ${
              p.featured ? "glass-strong ring-2 ring-signal-green" : "glass"
            }`}
          >
            {p.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-signal-green px-4 py-1 font-mono text-xs font-semibold text-white">
                MOST POPULAR
              </span>
            )}
            <h3 className="font-display text-xl font-bold text-ink">{p.name}</h3>
            <p className="mt-1 font-mono text-3xl font-bold text-signal-blue">{p.speed}</p>

            <div className="mt-5 flex items-baseline gap-1">
              <span className="font-mono text-4xl font-extrabold text-ink">KES {p.price.toLocaleString()}</span>
              <span className="text-sm text-ink/50">/month</span>
            </div>

            {p.freeMonth && (
              <span className="mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-signal-red/10 px-3 py-1 font-mono text-xs font-semibold text-signal-red">
                + 1 month free
              </span>
            )}

            <a href="https://wa.me/254703199691" target="_blank" className="btn-primary mt-8">
              Get This Package
            </a>
          </div>
        ))}

        {packages.length === 0 && (
          <p className="col-span-full text-center text-sm text-ink/50">
            Packages will appear here once added in the admin panel.
          </p>
        )}
      </div>
    </section>
  );
}
