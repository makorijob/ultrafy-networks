type Investment = {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  isActive: boolean;
};

export default function Invest({ investments }: { investments: Investment[] }) {
  const open = investments.filter((i) => i.isActive);
  if (open.length === 0) return null;

  return (
    <section id="invest" className="mx-auto max-w-6xl px-4 py-20">
      <p className="eyebrow text-center">Invest With Us</p>
      <h2 className="section-heading mt-2 text-center">Help us expand across Thika</h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-ink/60">
        We partner with investors who want to support the growth of local internet, security and power infrastructure.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {open.map((i) => (
          <div key={i.id} className="glass-strong overflow-hidden rounded-2xl">
            {i.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={i.imageUrl} alt={i.title} className="h-48 w-full object-cover" />
            )}
            <div className="p-6">
              <h3 className="font-display text-lg font-bold text-ink">{i.title}</h3>
              <p className="mt-2 text-sm text-ink/60">{i.description}</p>
              <a href="#contact" className="btn-secondary mt-5">
                Discuss This Opportunity
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
