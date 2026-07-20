import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await context.params;
  const body = await req.json();

  const updated = await prisma.contactSubmission.update({
    where: { id: Number(id) },
    data: { isRead: !!body.isRead },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await context.params;

  await prisma.contactSubmission.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ success: true });
}