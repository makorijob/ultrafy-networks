"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";

type Contact = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export default function ContactsAdminPage() {
  const [items, setItems] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/contact");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleRead(item: Contact) {
    await fetch(`/api/contact/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: !item.isRead }),
    });
    load();
  }

  async function remove(id: number) {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/contact/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <AdminShell>
      <h1 className="font-display text-2xl font-bold text-ink">Contact Messages</h1>
      <p className="mt-1 text-sm text-ink/50">Submissions from the website contact form.</p>

      {loading ? (
        <p className="mt-6 text-sm text-ink/50">Loading…</p>
      ) : (
        <div className="mt-6 space-y-3">
          {items.map((item) => (
            <div key={item.id} className={`glass rounded-2xl p-5 ${!item.isRead ? "ring-2 ring-signal-blue/40" : ""}`}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-display font-bold text-ink">
                    {item.name}
                    {!item.isRead && <span className="ml-2 rounded-full bg-signal-blue px-2 py-0.5 font-mono text-[10px] text-white">NEW</span>}
                  </p>
                  <p className="font-mono text-xs text-ink/50">
                    {[item.email, item.phone].filter(Boolean).join(" · ") || "No contact info given"}
                  </p>
                  <p className="font-mono text-xs text-ink/40">{new Date(item.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => toggleRead(item)} className="text-xs font-semibold text-signal-green hover:underline">
                    Mark as {item.isRead ? "unread" : "read"}
                  </button>
                  <button onClick={() => remove(item.id)} className="text-xs font-semibold text-signal-red hover:underline">
                    Delete
                  </button>
                </div>
              </div>
              {item.subject && <p className="mt-3 text-sm font-semibold text-ink/80">Subject: {item.subject}</p>}
              <p className="mt-2 text-sm text-ink/70">{item.message}</p>
            </div>
          ))}

          {items.length === 0 && <p className="text-center text-sm text-ink/50">No messages yet.</p>}
        </div>
      )}
    </AdminShell>
  );
}
