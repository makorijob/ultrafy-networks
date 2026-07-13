import { prisma } from "@/lib/prisma";
import { collectionHandlers } from "@/lib/crud-factory";

export const { GET, POST } = collectionHandlers(prisma.investment, { createdAt: "desc" });
