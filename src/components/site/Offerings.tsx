type Offering = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

export default function Offerings({ offerings }: { offerings: Offering[] }) {
  return (
    <section id="offerings" className="mx-auto max-w-6xl px-4 py-20">
      <p className="eyebrow text-center">What We Offer</p>
      <h2 className="section-heading mt-2 text-center">Everything to keep you connected & secure</h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-ink/60">
        From fiber internet to CCTV, solar and electric fencing — one local team for installation and support.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {offerings.map((o) => (
          <div key={o.id} className="glass group overflow-hidden rounded-2xl">
            <div className="relative h-44 w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={o.imageUrl} alt={o.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg font-bold text-ink">{o.title}</h3>
              <p className="mt-2 text-sm text-ink/60">{o.description}</p>
            </div>
          </div>
        ))}

        {offerings.length === 0 && (
          <p className="col-span-full text-center text-sm text-ink/50">
            Our services will appear here once added in the admin panel.
          </p>
        )}
      </div>
    </section>
  );
}
