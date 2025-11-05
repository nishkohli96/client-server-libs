/**
 * Make sure to add NEXTAUTH_URL in your .env.local file
 * pointing to your Next.js application URL. Without it,
 * you would get a redirect URL mismatch error during OAuth.
 *
 * You can configure your Google App Name and Logo by visiting
 * https://console.cloud.google.com/auth/branding
 */

import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';
import { ENV_VARS } from '@/constants';

const handler = NextAuth({
  providers: [
    Google({
      clientId: ENV_VARS.auth.googleId,
      clientSecret: ENV_VARS.auth.googleSecret
    })
    // Github({
    //   clientId: ENV_VARS.auth.githubId,
    //   clientSecret: ENV_VARS.auth.githubSecret
    // })
  ],
  secret: ENV_VARS.auth.nextAuthSecret,
  callbacks: {
    async session({ session, token }) {
      console.log('token: ', token);
      console.log('session: ', session);
      return session;
    }
  }
});

export { handler as GET, handler as POST };
