"use client";

import AdminShell from "@/components/admin/AdminShell";
import AdminCrud, { FieldDef } from "@/components/admin/AdminCrud";

const fields: FieldDef[] = [
  { name: "imageUrl", label: "Image", type: "image", required: true },
  { name: "title", label: "Title", type: "text", required: true },
  { name: "subtitle", label: "Subtitle", type: "textarea" },
  { name: "order", label: "Order", type: "number" },
];

export default function HeroSlidesAdminPage() {
  return (
    <AdminShell>
      <AdminCrud
        endpoint="/api/hero-slides"
        title="Hero Slides"
        fields={fields}
        emptyItem={{ imageUrl: "", title: "", subtitle: "", order: 0 }}
      />
    </AdminShell>
  );
}
