import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import type { NextRequest } from "next/server";

declare module "next-auth/jwt" {
  interface JWT {
    error?: string;
  }
}

const nextAuthSecret =
  process.env.NEXTAUTH_SECRET || "default-nextauth-secret";

declare module "next-auth" {
  interface Session {
    preAuthToken?: string;
    token?: string;
    userData?: any;
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "RememberMe", type: "boolean" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        try {
          const preAuthResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/auth/pre`,
            {
              usernameOrEmail: credentials.email,
              password: credentials.password,
              rememberMe: credentials.rememberMe == "true" ? 1 : 0,
            },
          );

          if (!preAuthResponse.data.success) {
            throw new Error(
              preAuthResponse.data.error || "Invalid email or password!",
            );
          }

          const { token, subscriptions } = preAuthResponse.data.data;
          const subscription = subscriptions[0];

          if (!subscription) {
            throw new Error("No subscription found for this user!");
          }

          const authResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/auth/${subscription.id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (!authResponse.data.success) {
            throw new Error(
              authResponse.data.error || "Error completing authentication",
            );
          }

          return {
            id: credentials.email,
            preAuthToken: token,
            token: authResponse.data.data.token,
            email: credentials.email,
          };
        } catch (error: any) {
          console.error("Authorization error:", error?.response?.data || error);
          throw new Error(
            error?.response?.data?.error ||
              error?.message ||
              "Error completing authentication",
          );
        }
      },
    }),
  ],
  pages: {
    signIn: "auth/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.preAuthToken = (user as any).preAuthToken;
        token.token = (user as any).token;
      }

      return token;
    },

    async session({ session, token }) {
      session.preAuthToken = token.preAuthToken as string;
      session.token = token.token as string;

      const {
        data: { data },
      } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        },
      );

      if (data?.user) {
        session.userData = data;
      }

      return session;
    },
  },
  secret: nextAuthSecret,
};

interface RouteHandlerContext {
  params: { nextauth: string[] };
}

async function auth(req: NextRequest, context: RouteHandlerContext) {
  return await NextAuth(req, context, authOptions);
}

export { auth as GET, auth as POST };
