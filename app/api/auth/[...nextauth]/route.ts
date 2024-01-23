import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
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
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
