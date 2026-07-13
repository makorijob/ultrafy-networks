"use client";

import AdminShell from "@/components/admin/AdminShell";
import AdminCrud, { FieldDef } from "@/components/admin/AdminCrud";

const fields: FieldDef[] = [
  { name: "title", label: "Job Title", type: "text", required: true },
  { name: "location", label: "Location", type: "text" },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "imageUrl", label: "Image (optional)", type: "image" },
  { name: "isActive", label: "Currently Open", type: "boolean" },
];

export default function JobsAdminPage() {
  return (
    <AdminShell>
      <AdminCrud
        endpoint="/api/jobs"
        title="Career Openings"
        fields={fields}
        emptyItem={{ title: "", location: "", description: "", imageUrl: "", isActive: true }}
      />
    </AdminShell>
  );
}
