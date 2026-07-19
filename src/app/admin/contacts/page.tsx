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
      <h1 className="font-display text-xl font-semibold text-[#171717]">Messages</h1>
      <p className="mt-0.5 text-[13px] text-[#8F8F8F]">Submissions from the website contact form.</p>

      {loading ? (
        <p className="mt-6 text-[13px] text-[#8F8F8F]">Loading…</p>
      ) : (
        <div className="mt-5 space-y-2.5">
          {items.map((item) => (
            <div key={item.id} className="av-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="flex items-center gap-2 font-display text-[14px] font-semibold text-[#171717]">
                    {item.name}
                    {!item.isRead && <span className="rounded-full bg-black px-1.5 py-0.5 font-mono text-[10px] text-white">NEW</span>}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-[#8F8F8F]">
                    {[item.email, item.phone].filter(Boolean).join(" · ") || "No contact info given"}
                  </p>
                  <p className="font-mono text-[11px] text-[#D4D4D4]">{new Date(item.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => toggleRead(item)} className="text-[13px] font-medium text-[#171717] hover:underline">
                    Mark as {item.isRead ? "unread" : "read"}
                  </button>
                  <button onClick={() => remove(item.id)} className="av-btn-danger-ghost hover:underline">
                    Delete
                  </button>
                </div>
              </div>
              {item.subject && <p className="mt-3 text-[13px] font-medium text-[#525252]">Subject: {item.subject}</p>}
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#525252]">{item.message}</p>
            </div>
          ))}

          {items.length === 0 && (
            <div className="av-card p-12 text-center text-[13px] text-[#8F8F8F]">No messages yet.</div>
          )}
        </div>
      )}
    </AdminShell>
  );
}
