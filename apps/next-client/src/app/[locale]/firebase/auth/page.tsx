'use client';

/**
 * firebaseui library is written in UMD style (Universal Module Definition),
 * old style JS. Hence, we need to use `import * as` syntax to import it.
 */

import { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import * as firebaseUI from 'firebaseui';
import 'firebase/compat/auth';
import 'firebaseui/dist/firebaseui.css';
import firebaseService from '@/services/firebase';

export default function FirebaseSignIn() {
  const firebaseContainerId = 'firebase-auth-container';
  const uiConfig = {
    signInSuccessUrl: '/firebase',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      // firebaseUI.auth.AnonymousAuthProvider.PROVIDER_ID
    ]
  };

  useEffect(() => {
    const ui = new firebaseUI.auth.AuthUI(firebaseService.getAuthInstance());
    ui.start(`#${firebaseContainerId}`, uiConfig);
  }, []);

  return <div id={firebaseContainerId} />;
}
