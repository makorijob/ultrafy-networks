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
        <div>
          <h1 className="font-display text-xl font-semibold text-[#171717]">{title}</h1>
          <p className="mt-0.5 text-[13px] text-[#8F8F8F]">{items.length} item{items.length === 1 ? "" : "s"}</p>
        </div>
        <button onClick={openCreate} className="av-btn-black">
          <span className="text-base leading-none">+</span> Add New
        </button>
      </div>

      <div className="av-card admin-scroll mt-5 overflow-x-auto">
        {loading ? (
          <p className="px-4 py-10 text-center text-[13px] text-[#8F8F8F]">Loading…</p>
        ) : (
          <table className="av-table">
            <thead>
              <tr>
                {fields.slice(0, 4).map((f) => (
                  <th key={f.name} className="px-4 py-3 font-medium">{f.label}</th>
                ))}
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  {fields.slice(0, 4).map((f) => (
                    <td key={f.name} className="max-w-[220px] truncate px-4 py-3">
                      {f.type === "image" ? (
                        item[f.name] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={item[f.name]} alt="" className="h-9 w-9 rounded-md border border-[#EAEAEA] object-cover" />
                        ) : (
                          <span className="text-[#D4D4D4]">—</span>
                        )
                      ) : f.type === "boolean" ? (
                        item[f.name] ? (
                          <span className="av-badge-live">Yes</span>
                        ) : (
                          <span className="av-badge">No</span>
                        )
                      ) : (
                        <span className={f.type === "number" ? "font-mono" : ""}>{String(item[f.name] ?? "—")}</span>
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(item)} className="mr-4 text-[13px] font-medium text-[#171717] hover:underline">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="av-btn-danger-ghost hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={fields.length + 1} className="px-4 py-12 text-center text-[13px] text-[#8F8F8F]">
                    Nothing here yet — click &quot;Add New&quot; to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {showForm && editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={() => setShowForm(false)}>
          <div
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl border border-[#EAEAEA] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-[#EAEAEA] px-6 py-4">
              <h2 className="font-display text-[15px] font-semibold text-[#171717]">
                {editing.id ? "Edit" : "Add"} {title.replace(/s$/, "")}
              </h2>
            </div>

            <div className="space-y-4 px-6 py-5">
              {fields.map((f) => (
                <div key={f.name}>
                  <label className="av-label">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea
                      rows={3}
                      className="av-input"
                      value={editing[f.name] ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                    />
                  ) : f.type === "boolean" ? (
                    <label className="flex items-center gap-2 text-[13px] text-[#525252]">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-[#D4D4D4] accent-black"
                        checked={!!editing[f.name]}
                        onChange={(e) => setEditing({ ...editing, [f.name]: e.target.checked })}
                      />
                      Yes
                    </label>
                  ) : f.type === "number" ? (
                    <input
                      type="number"
                      className="av-input font-mono"
                      value={editing[f.name] ?? 0}
                      onChange={(e) => setEditing({ ...editing, [f.name]: Number(e.target.value) })}
                    />
                  ) : f.type === "image" ? (
                    <ImageUploader value={editing[f.name] ?? ""} onChange={(url) => setEditing({ ...editing, [f.name]: url })} />
                  ) : (
                    <input
                      className="av-input"
                      required={f.required}
                      value={editing[f.name] ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                    />
                  )}
                </div>
              ))}
            </div>

            {error && <p className="px-6 text-[13px] text-[#EE0000]">{error}</p>}

            <div className="flex justify-end gap-2 border-t border-[#EAEAEA] px-6 py-4">
              <button onClick={() => setShowForm(false)} className="av-btn-ghost">
                Cancel
              </button>
              <button onClick={handleSave} className="av-btn-black">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
