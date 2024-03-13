import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { config } from "../../../config";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
    }),
  ],
  pages: {
    signIn: "/auth/Login",
  },
};

export default NextAuth(authOptions);
