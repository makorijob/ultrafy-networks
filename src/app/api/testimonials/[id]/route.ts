import { prisma } from "@/lib/prisma";
import { itemHandlers } from "@/lib/crud-factory";

export const { PUT, DELETE } = itemHandlers(prisma.testimonial);
