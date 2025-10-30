/**
 * By default, next-auth doesnt provide any buttons for
 * login by an auth provider. Calling the "signIn()" function
 * without the provider name shows a list of all configured
 * providers.
 */
'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function LoginPage() {
  /**
   * For usage in server components, use "getServerSession()" instead.
   * https://next-auth.js.org/configuration/nextjs#getserversession
   */
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="p-6">
        <p>
          {`Signed in as ${session.user?.email}`}
        </p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <button onClick={() => signIn('google')}>Sign in with Google</button>
    </div>
  );
}
