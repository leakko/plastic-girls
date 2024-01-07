import dbConnect from '@/lib/db-connect';
import UserModel from '@/models/db/UserModel';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        await dbConnect();

        const user = await UserModel.findOne({ email });
        if (!user) throw Error('We cannot find an account with that email, please register');

        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) throw Error('Email or password is not correct');

        if (!user.active) throw Error('Account pending activation. Check your email inbox');

        return {
          email: user.email,
          active: user.active,
          id: user._id,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ user, token }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
      }
      return session;
    },
  },
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
