type Job = {
  id: number;
  title: string;
  location: string | null;
  description: string;
  imageUrl: string | null;
  isActive: boolean;
};

export default function Careers({ jobs }: { jobs: Job[] }) {
  const openJobs = jobs.filter((j) => j.isActive);

  return (
    <section id="careers" className="mx-auto max-w-6xl px-4 py-20">
      <p className="eyebrow text-center">Careers</p>
      <h2 className="section-heading mt-2 text-center">Join the Ultrafy team</h2>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {openJobs.map((j) => (
          <div key={j.id} className="glass flex gap-4 overflow-hidden rounded-2xl p-5">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-signal-blue/15 to-signal-green/15">
              {j.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={j.imageUrl} alt={j.title} className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center font-display text-2xl font-bold text-signal-blue/40">
                  {j.title.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-ink">{j.title}</h3>
              {j.location && <p className="font-mono text-xs text-ink/50">{j.location}</p>}
              <p className="mt-2 text-sm text-ink/60">{j.description}</p>
              <a href="#contact" className="mt-3 inline-block text-sm font-semibold text-signal-green hover:underline">
                Apply now →
              </a>
            </div>
          </div>
        ))}

        {openJobs.length === 0 && (
          <div className="glass col-span-full rounded-2xl p-10 text-center">
            <p className="font-display font-semibold text-ink">No open positions right now</p>
            <p className="mt-1 text-sm text-ink/50">Check back soon, or send us your CV via the contact form below.</p>
          </div>
        )}
      </div>
    </section>
  );
}
