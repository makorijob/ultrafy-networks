"use client";

import AdminShell from "@/components/admin/AdminShell";
import AdminCrud, { FieldDef } from "@/components/admin/AdminCrud";

const fields: FieldDef[] = [
  { name: "name", label: "Client Name", type: "text", required: true },
  { name: "role", label: "Role / Location", type: "text" },
  { name: "message", label: "Testimonial", type: "textarea", required: true },
  { name: "rating", label: "Rating (1-5)", type: "number" },
  { name: "imageUrl", label: "Photo (optional)", type: "image" },
];

export default function TestimonialsAdminPage() {
  return (
    <AdminShell>
      <AdminCrud
        endpoint="/api/testimonials"
        title="Testimonials"
        fields={fields}
        emptyItem={{ name: "", role: "", message: "", rating: 5, imageUrl: "" }}
      />
    </AdminShell>
  );
}
