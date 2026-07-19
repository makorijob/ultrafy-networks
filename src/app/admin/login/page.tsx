"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Login failed");
      setLoading(false);
      return;
    }
    window.location.href = "/admin";
  }

  return (
    <div className="grid min-h-screen place-items-center bg-[#FAFAFA] px-4">
      <div className="w-full max-w-[360px]">
        <div className="mb-6 flex flex-col items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-signal-blue to-signal-green font-display text-lg font-extrabold text-white">
            U
          </span>
          <div className="text-center">
            <p className="font-display text-[15px] font-semibold text-[#171717]">Ultrafy Networks</p>
            <p className="font-mono text-[11px] text-[#8F8F8F]">admin console</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border border-[#EAEAEA] bg-white p-6 shadow-sm">
          <label className="av-label">Password</label>
          <input
            type="password"
            required
            autoFocus
            className="av-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="mt-2 text-[13px] text-[#EE0000]">{error}</p>}
          <button type="submit" disabled={loading} className="av-btn-black mt-5 w-full !py-2.5">
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="mt-5 text-center text-[12px] text-[#8F8F8F]">
          <a href="/" className="hover:text-[#171717] hover:underline">← Back to site</a>
        </p>
      </div>
    </div>
  );
            }
          
