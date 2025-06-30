import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const globalForPrisma = global as unknown as { prisma: typeof prisma };

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const db = globalForPrisma.prisma || prisma;

export default db;
