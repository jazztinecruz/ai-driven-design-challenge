import { PrismaClient, User } from "@prisma/client";
import { NextResponse } from "next/server";

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

export const getUser = async ({ email }: { email: string }) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("Cannot find User");
  return user;
};
