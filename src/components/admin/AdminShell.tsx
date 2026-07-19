"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Overview", icon: "▦" },
  { href: "/admin/hero-slides", label: "Hero Slides", icon: "▤" },
  { href: "/admin/offerings", label: "What We Offer", icon: "◧" },
  { href: "/admin/packages", label: "Packages", icon: "◫" },
  { href: "/admin/jobs", label: "Careers", icon: "◨" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "❝" },
  { href: "/admin/investments", label: "Invest Options", icon: "◎" },
  { href: "/admin/contacts", label: "Messages", icon: "✉" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  const current = navItems.find((n) => n.href === pathname);

  return (
    <div className="av-root lg:flex">
      <aside className="av-sidebar">
        <div className="flex items-center gap-2 px-5 py-5">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-signal-blue to-signal-green font-display text-xs font-extrabold text-white">
            U
          </span>
          <div className="leading-tight">
            <p className="font-display text-[13px] font-semibold text-white">Ultrafy Networks</p>
            <p className="font-mono text-[10px] text-[#8F8F8F]">admin console</p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-0.5 px-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`av-nav-link ${pathname === item.href ? "av-nav-link-active" : ""}`}
            >
              <span className="w-4 text-center text-[13px] opacity-70">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-0.5 border-t border-white/10 p-3">
          <Link href="/" className="av-nav-link">
            <span className="w-4 text-center opacity-70">↗</span>
            View live site
          </Link>
          <button onClick={logout} className="av-nav-link text-left text-[#F87171] hover:text-[#FCA5A5]">
            <span className="w-4 text-center opacity-70">⏻</span>
            Log out
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <header className="av-topbar">
          <div className="flex items-center gap-2 text-[13px] text-[#8F8F8F]">
            <span>Ultrafy Networks</span>
            <span className="text-[#D4D4D4]">/</span>
            <span className="font-medium text-[#171717]">{current?.label ?? "Admin"}</span>
          </div>
          <span className="av-badge-live">
            <span className="h-1.5 w-1.5 rounded-full bg-[#12A454]" /> Live
          </span>
        </header>
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
