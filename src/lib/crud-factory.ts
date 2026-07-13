import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";

type Delegate = {
  findMany: (args?: any) => Promise<any>;
  create: (args: any) => Promise<any>;
  update: (args: any) => Promise<any>;
  delete: (args: any) => Promise<any>;
};

/** Builds GET (public, list) + POST (admin, create) handlers for a collection route. */
export function collectionHandlers(delegate: Delegate, orderBy: any = { order: "asc" }) {
  async function GET() {
    const items = await delegate.findMany({ orderBy });
    return NextResponse.json(items);
  }

  async function POST(req: NextRequest) {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;
    const body = await req.json();
    const created = await delegate.create({ data: body });
    return NextResponse.json(created, { status: 201 });
  }

  return { GET, POST };
}

/** Builds PUT (admin, update) + DELETE (admin, delete) handlers for an [id] route. */
export function itemHandlers(delegate: Delegate) {
  async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;
    const body = await req.json();
    const { id, createdAt, ...rest } = body;
    const updated = await delegate.update({
      where: { id: Number(params.id) },
      data: rest,
    });
    return NextResponse.json(updated);
  }

  async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;
    await delegate.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({ success: true });
  }

  return { PUT, DELETE };
}
