import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [slides, offerings, packages, jobs, testimonials, investments, unreadContacts] = await Promise.all([
    prisma.heroSlide.count(),
    prisma.offering.count(),
    prisma.package.count(),
    prisma.job.count({ where: { isActive: true } }),
    prisma.testimonial.count(),
    prisma.investment.count({ where: { isActive: true } }),
    prisma.contactSubmission.count({ where: { isRead: false } }),
  ]);

  const cards = [
    { label: "Hero Slides", value: slides, href: "/admin/hero-slides" },
    { label: "Services Offered", value: offerings, href: "/admin/offerings" },
    { label: "Packages", value: packages, href: "/admin/packages" },
    { label: "Open Jobs", value: jobs, href: "/admin/jobs" },
    { label: "Testimonials", value: testimonials, href: "/admin/testimonials" },
    { label: "Active Investments", value: investments, href: "/admin/investments" },
    { label: "Unread Messages", value: unreadContacts, href: "/admin/contacts" },
  ];

  return (
    <AdminShell>
      <h1 className="font-display text-2xl font-bold text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-ink/50">Manage everything shown on the public Ultrafy Networks site.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="glass rounded-2xl p-6 transition hover:shadow-glow">
            <p className="font-mono text-3xl font-bold text-signal-blue">{c.value}</p>
            <p className="mt-1 text-sm text-ink/60">{c.label}</p>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
