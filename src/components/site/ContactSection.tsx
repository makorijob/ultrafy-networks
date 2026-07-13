"use client";

import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
      <p className="eyebrow text-center">Get In Touch</p>
      <h2 className="section-heading mt-2 text-center">We&apos;d love to hear from you</h2>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr,1.2fr]">
        <div className="glass rounded-2xl p-8">
          <h3 className="font-display text-lg font-bold text-ink">Contact details</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <span className="block font-mono text-xs uppercase tracking-wider text-ink/40">Phone / Call</span>
              <a href="tel:0703199691" className="font-mono text-lg font-semibold text-signal-blue">
                0703 199 691
              </a>
            </li>
            <li>
              <span className="block font-mono text-xs uppercase tracking-wider text-ink/40">WhatsApp</span>
              <a href="https://wa.me/254703199691" target="_blank" className="font-semibold text-signal-green hover:underline">
                Chat with us on WhatsApp
              </a>
            </li>
            <li>
              <span className="block font-mono text-xs uppercase tracking-wider text-ink/40">Email</span>
              <a href="mailto:info.ultrafynetworks@gmail.com" className="font-semibold text-ink hover:underline">
                info.ultrafynetworks@gmail.com
              </a>
            </li>
            <li>
              <span className="block font-mono text-xs uppercase tracking-wider text-ink/40">Location</span>
              <span className="font-semibold text-ink">Thika, Kenya</span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              placeholder="Full name"
              className="input-field"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email (optional)"
              className="input-field"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              placeholder="Phone (optional)"
              className="input-field"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <input
              placeholder="Subject (optional)"
              className="input-field"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
          </div>
          <textarea
            required
            placeholder="Your message"
            rows={4}
            className="input-field mt-4"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <button type="submit" disabled={status === "sending"} className="btn-primary mt-5 w-full sm:w-auto">
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>
          {status === "sent" && <p className="mt-3 text-sm font-medium text-signal-green">Message sent — we&apos;ll get back to you soon.</p>}
          {status === "error" && <p className="mt-3 text-sm font-medium text-signal-red">Something went wrong. Please try again or call us directly.</p>}
        </form>
      </div>
    </section>
  );
}
