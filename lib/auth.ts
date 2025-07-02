import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { encode } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./zod";
import { getUserFromDb } from "./utils/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./prisma";
import { v4 as uuid } from "uuid";

const prismaAdapter = PrismaAdapter(db);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: prismaAdapter,
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        name: {
          type: "text",
          label: "Name",
          placeholder: "John Doe",
        },
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      authorize: async (credentials) => {
        try {
          const validatedFields = signInSchema.safeParse(credentials);

          if (!validatedFields.success) {
            throw new Error(validatedFields.error.message);
          }

          const { email, password } = validatedFields.data;

          // logic to verify if the user exists
          const dbResponse = await getUserFromDb(email, password);

          if (!dbResponse.success || !dbResponse.user) {
            return null; // Return null if user not found or error occurred
          }

          // return user object with their profile data
          return dbResponse?.user;
        } catch (error: any) {
          console.error("Error during sign-in:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await prismaAdapter?.createSession?.({
          sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return encode(params);
    },
  },
});
