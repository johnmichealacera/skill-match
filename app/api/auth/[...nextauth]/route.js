import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password, role } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({
            $or: [
              { email },
              { phoneNumber: email }
            ]
          });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch && role === user?.role) {
            return null;
          }

          // Return user object including the role
          return {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,  // Ensure role is included here
            imageUrl: user.imageUrl,  // Ensure imageUrl is included here
          };
        } catch (error) {
          console.error("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user role to the token right after signin
      if (user) {
        token.role = user.role;
        token.imageUrl = user.imageUrl;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }

      return token;
    },
    async session({ session, token }) {
      // Add role value to session
      if (token) {
        session.user.role = token.role;
        session.user.imageUrl = token.imageUrl;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };