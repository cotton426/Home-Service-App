import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const User = {
  findUnique: (email) => {
    return prisma.user.findUnique({ where: { email } });
  },
  create: (data) => {
    return prisma.user.create({ data });
  },
};
