'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="p-6">
        <p>
          Signed in as
          {session.user?.email}
        </p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <button onClick={() => signIn()}>Sign in with Google</button>
    </div>
  );
}
