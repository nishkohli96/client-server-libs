'use client';

import { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import firebaseService from '@/services/firebase';
import 'firebaseui/dist/firebaseui.css';
import type firebaseui from 'firebaseui';

export default function FirebaseSignIn() {
  const firebaseContainerId = 'firebase-auth-container';

  /**
	 * https://www.npmjs.com/package/firebaseui
	 *
   * firebaseui library is written in UMD style (Universal Module Definition),
   * old style JS. Hence, we need to use `import * as` syntax to import it.
   */
  useEffect(() => {
    import('firebaseui').then(firebaseUI => {
      const ui = firebaseUI.auth.AuthUI.getInstance() || new firebaseUI.auth.AuthUI(firebaseService.getAuthInstance());
      /* https://www.npmjs.com/package/firebaseui#configuration */
      const uiConfig: firebaseui.auth.Config = {
        signInSuccessUrl: '/firebase/auth/success',
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          'apple.com',
          'microsoft.com',
          {
            provider: 'yahoo.com',
            fullLabel: 'Yahoo',
          },
          firebaseUI.auth.AnonymousAuthProvider.PROVIDER_ID,
        ],
      };
      ui.start(`#${firebaseContainerId}`, uiConfig);
    });
  }, []);

  return <div id={firebaseContainerId} />;
}
