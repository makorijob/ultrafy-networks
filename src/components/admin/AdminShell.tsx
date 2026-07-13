"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/hero-slides", label: "Hero Slides" },
  { href: "/admin/offerings", label: "What We Offer" },
  { href: "/admin/packages", label: "Packages" },
  { href: "/admin/jobs", label: "Careers" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/investments", label: "Invest Options" },
  { href: "/admin/contacts", label: "Contact Messages" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <aside className="glass-strong m-3 flex shrink-0 flex-col rounded-2xl p-4 lg:w-64">
        <div className="mb-6 flex items-center gap-2 px-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-signal-blue to-signal-green font-display text-sm font-extrabold text-white">
            U
          </span>
          <span className="font-display text-sm font-bold text-ink">Ultrafy Admin</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                pathname === item.href ? "bg-signal-blue text-white" : "text-ink/70 hover:bg-white/70"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-4 flex flex-col gap-1 border-t border-slate-200 pt-3">
          <Link href="/" className="rounded-lg px-3 py-2 text-sm font-medium text-ink/60 hover:bg-white/70">
            ← View site
          </Link>
          <button onClick={logout} className="rounded-lg px-3 py-2 text-left text-sm font-medium text-signal-red hover:bg-white/70">
            Log out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-4 lg:p-8">{children}</main>
    </div>
  );
}
