"use client";

import AdminShell from "@/components/admin/AdminShell";
import AdminCrud, { FieldDef } from "@/components/admin/AdminCrud";

const fields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "imageUrl", label: "Image (optional)", type: "image" },
  { name: "isActive", label: "Currently Open", type: "boolean" },
];

export default function InvestmentsAdminPage() {
  return (
    <AdminShell>
      <AdminCrud
        endpoint="/api/investments"
        title="Invest Options"
        fields={fields}
        emptyItem={{ title: "", description: "", imageUrl: "", isActive: true }}
      />
    </AdminShell>
  );
}
