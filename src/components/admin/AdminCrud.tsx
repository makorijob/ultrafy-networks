"use client";

import { useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";

export type FieldDef = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "boolean" | "image";
  required?: boolean;
};

export default function AdminCrud({
  endpoint,
  title,
  fields,
  emptyItem,
}: {
  endpoint: string;
  title: string;
  fields: FieldDef[];
  emptyItem: Record<string, any>;
}) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch(endpoint);
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [endpoint]);

  function openCreate() {
    setEditing({ ...emptyItem });
    setShowForm(true);
    setError("");
  }

  function openEdit(item: any) {
    setEditing({ ...item });
    setShowForm(true);
    setError("");
  }

  async function handleSave() {
    setError("");
    const isNew = !editing.id;
    const url = isNew ? endpoint : `${endpoint}/${editing.id}`;
    const method = isNew ? "POST" : "PUT";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Save failed");
      return;
    }
    setShowForm(false);
    setEditing(null);
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink">{title}</h1>
        <button onClick={openCreate} className="btn-primary !px-5 !py-2 text-sm">
          + Add New
        </button>
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-ink/50">Loading…</p>
      ) : (
        <div className="admin-scroll mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-ink/50">
              <tr>
                {fields.slice(0, 4).map((f) => (
                  <th key={f.name} className="px-4 py-3">{f.label}</th>
                ))}
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 last:border-0">
                  {fields.slice(0, 4).map((f) => (
                    <td key={f.name} className="max-w-[220px] truncate px-4 py-3">
                      {f.type === "image" ? (
                        item[f.name] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={item[f.name]} alt="" className="h-10 w-10 rounded object-cover" />
                        ) : (
                          <span className="text-ink/30">—</span>
                        )
                      ) : f.type === "boolean" ? (
                        item[f.name] ? "Yes" : "No"
                      ) : (
                        String(item[f.name] ?? "—")
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(item)} className="mr-3 text-xs font-semibold text-signal-blue hover:underline">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-xs font-semibold text-signal-red hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={fields.length + 1} className="px-4 py-8 text-center text-ink/40">
                    Nothing here yet. Click &quot;Add New&quot; to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showForm && editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4" onClick={() => setShowForm(false)}>
          <div className="glass-strong max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-lg font-bold text-ink">{editing.id ? "Edit" : "Add"} {title.replace(/s$/, "")}</h2>

            <div className="mt-5 space-y-4">
              {fields.map((f) => (
                <div key={f.name}>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink/50">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea
                      rows={3}
                      className="input-field"
                      value={editing[f.name] ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                    />
                  ) : f.type === "boolean" ? (
                    <label className="flex items-center gap-2 text-sm text-ink/70">
                      <input
                        type="checkbox"
                        checked={!!editing[f.name]}
                        onChange={(e) => setEditing({ ...editing, [f.name]: e.target.checked })}
                      />
                      Yes
                    </label>
                  ) : f.type === "number" ? (
                    <input
                      type="number"
                      className="input-field"
                      value={editing[f.name] ?? 0}
                      onChange={(e) => setEditing({ ...editing, [f.name]: Number(e.target.value) })}
                    />
                  ) : f.type === "image" ? (
                    <ImageUploader value={editing[f.name] ?? ""} onChange={(url) => setEditing({ ...editing, [f.name]: url })} />
                  ) : (
                    <input
                      className="input-field"
                      required={f.required}
                      value={editing[f.name] ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                    />
                  )}
                </div>
              ))}
            </div>

            {error && <p className="mt-3 text-sm text-signal-red">{error}</p>}

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-ink/70">
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary !px-5 !py-2 text-sm">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
