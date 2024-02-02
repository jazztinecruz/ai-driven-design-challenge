import { PrismaClient } from "@prisma/client";
import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID ?? "",
      clientSecret: process.env.GOOGLE_CLIENTSECRET ?? "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENTID ?? "",
      clientSecret: process.env.GITHUB_CLIENTSECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile }) {
      const existingUser = await prisma.user.findUnique({
        where: { email: profile?.email },
      });

      if (!existingUser) {
        try {
          await prisma.user.create({
            data: {
              email: profile?.email as string,
              name: profile?.name,
            },
          });
          return true;
        } catch (error) {
          console.error("Failed creating user", error);
          return false;
        }
      }
      return true;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
