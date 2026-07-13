export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white/50 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display font-bold text-ink">
            Ultrafy <span className="text-signal-green">Networks</span>
          </p>
          <p className="mt-1 text-xs text-ink/50">Fiber · Wireless · CCTV · Solar · Electric Fencing — Thika</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-xs text-ink/50">
          <a href="tel:0703199691" className="hover:text-signal-blue">0703 199 691</a>
          <a href="mailto:info.ultrafynetworks@gmail.com" className="hover:text-signal-blue">info.ultrafynetworks@gmail.com</a>
          <a href="/admin/login" className="hover:text-signal-blue">Admin</a>
        </div>
        <p className="text-xs text-ink/40">© {new Date().getFullYear()} Ultrafy Networks. All rights reserved.</p>
      </div>
    </footer>
  );
}
