"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // Reload so the authentication cookie is included
      // on the next request.
      window.location.href = "/admin";
    } catch (err) {
      console.error("[Login] Error:", err);
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-[#FAFAFA] px-4">
      <div className="w-full max-w-[360px]">
        <div className="mb-6 flex flex-col items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-signal-blue to-signal-green font-display text-lg font-extrabold text-white">
            U
          </span>

          <div className="text-center">
            <p className="font-display text-[15px] font-semibold text-[#171717]">
              Ultrafy Networks
            </p>

            <p className="font-mono text-[11px] text-[#8F8F8F]">
              admin console
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-[#EAEAEA] bg-white p-6 shadow-sm"
        >
          <label htmlFor="password" className="av-label">
            Password
          </label>

          <input
            id="password"
            type="password"
            required
            autoFocus
            disabled={loading}
            className="av-input"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <div className="mt-3 rounded-md border border-[#FFD9D9] bg-[#FFF5F5] px-3 py-2 text-[13px] text-[#EE0000]">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="av-btn-black mt-5 w-full !py-2.5"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>

          <p className="mt-5 border-t border-[#F2F2F2] pt-4 text-center text-[11px] text-[#8F8F8F]">
            Protected area. Unauthorized access is prohibited.
          </p>
        </form>

        <p className="mt-5 text-center text-[12px] text-[#8F8F8F]">
          <Link
            href="/"
            className="hover:text-[#171717] hover:underline"
          >
            ← Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}