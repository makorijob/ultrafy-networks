"use client";

import AdminShell from "@/components/admin/AdminShell";
import AdminCrud, { FieldDef } from "@/components/admin/AdminCrud";

const fields: FieldDef[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "speed", label: "Speed", type: "text", required: true },
  { name: "price", label: "Price (KES)", type: "number", required: true },
  { name: "freeMonth", label: "1 Month Free", type: "boolean" },
  { name: "featured", label: "Featured / Most Popular", type: "boolean" },
  { name: "order", label: "Order", type: "number" },
];

export default function PackagesAdminPage() {
  return (
    <AdminShell>
      <AdminCrud
        endpoint="/api/packages"
        title="Internet Packages"
        fields={fields}
        emptyItem={{ name: "", speed: "", price: 0, freeMonth: false, featured: false, order: 0 }}
      />
    </AdminShell>
  );
}
