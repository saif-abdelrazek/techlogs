/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY!,
      from: process.env.EMAIL_FROM!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile }: { user: any; account?: any; profile?: any }) {
      if (!user || !account) return false;
      
      try {
        const authorData = profile || user;
        
        const existingUser = await client.withConfig({ useCdn: false }).fetch(
          AUTHOR_BY_ID_QUERY,
          { id: authorData?.id || user.id }
        );
        
        if (!existingUser) {
          await writeClient.create({
            _type: "author",
            id: authorData?.id || user.id,
            name: authorData?.name || user.name || "Unknown",
            email: authorData?.email || user.email || "",
            username: authorData?.username || authorData?.login || "",
            image: authorData?.image || user.image || "",
            bio: authorData?.bio || "",
          });
        }
        
        return true;
      } catch (error) {
        console.error("Error during sign-in callback:", error);
        return false;
      }
    },
    async session({ session, token }: { session: any; token: { sub?: string } }) {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});