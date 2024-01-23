import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async () => {
  let users: User[] = [];

  try {
    users = await prisma.user.findMany();
  } catch (error) {
    console.error(error);
  }

  return { users };
};
