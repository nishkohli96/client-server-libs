import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { ENV_VARS } from '@/constants';

const handler = NextAuth({
  providers: [
    Google({
      clientId: ENV_VARS.auth.googleId,
      clientSecret: ENV_VARS.auth.googleSecret
    })
  ],
  callbacks: {
    async session({ session, token }) {
      console.log('token: ', token);
      console.log('session: ', session);
      // Attach Google ID if available
      // if (token.sub) session.user.id = token.sub;
      return session;
    }
  }
});

export { handler as GET, handler as POST };
