// app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("[Login] Submitting login request");
      
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      console.log("[Login] Response status:", response.status);
      console.log("[Login] Response data:", data);

      if (!response.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      console.log("[Login] Login successful, redirecting...");
      
      // Use window.location for a full page reload to ensure cookie is set
      window.location.href = "/admin";
      
    } catch (error) {
      console.error("[Login] Error:", error);
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-2xl font-bold text-white shadow-lg">
            U
          </div>
          <h1 className="text-2xl font-bold text-gray-900">UltrafyNetworks Admin</h1>
          <p className="mt-1 text-sm text-gray-600">Enter your credentials to continue</p>
        </div>
        
        <div className="mb-4">
          <label 
            htmlFor="password" 
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoFocus
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            disabled={loading}
          />
        </div>
        
        {error && (
          <div className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700 border border-red-100">
            {error}
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={loading} 
          className="mt-4 w-full rounded-lg bg-blue-600 py-2.5 text-white font-medium transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
        
        <div className="mt-6 text-center text-xs text-gray-500 border-t border-gray-100 pt-4">
          Protected area. Unauthorized access is prohibited.
        </div>
      </form>
    </div>
  );
}
