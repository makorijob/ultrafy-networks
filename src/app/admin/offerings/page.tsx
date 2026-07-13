"use client";

import AdminShell from "@/components/admin/AdminShell";
import AdminCrud, { FieldDef } from "@/components/admin/AdminCrud";

const fields: FieldDef[] = [
  { name: "imageUrl", label: "Image", type: "image", required: true },
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "order", label: "Order", type: "number" },
];

export default function OfferingsAdminPage() {
  return (
    <AdminShell>
      <AdminCrud
        endpoint="/api/offerings"
        title="What We Offer"
        fields={fields}
        emptyItem={{ imageUrl: "", title: "", description: "", order: 0 }}
      />
    </AdminShell>
  );
}
