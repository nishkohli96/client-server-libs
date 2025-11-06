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
      const firebaseAuth = firebaseService.getAuthInstance();
      const loggedUser = firebaseAuth.currentUser;
      console.log('loggedUser: ', loggedUser);
      const ui = firebaseUI.auth.AuthUI.getInstance() || new firebaseUI.auth.AuthUI(firebaseAuth);

      /* https://www.npmjs.com/package/firebaseui#configuration */
      const uiConfig: firebaseui.auth.Config = {
        autoUpgradeAnonymousUsers: true,
        signInSuccessUrl: '/firebase/auth/success',
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            scopes: ['https://www.googleapis.com/auth/contacts.readonly'],
            customParameters: {
              /* Forces account selection. */
              prompt: 'select_account'
            }
          },
          {
            provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            scopes: ['public_profile', 'email', 'user_likes', 'user_friends'],
            customParameters: {
              /* Forces password re-entry. */
              auth_type: 'reauthenticate'
            }
          },
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          {
            provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            recaptchaParameters: {
              type: 'image',
              size: 'normal',
              badge: 'bottomleft'
            },
            defaultCountry: 'IN'
          },
          'apple.com',
          'microsoft.com',
          {
            provider: 'yahoo.com',
            fullLabel: 'Yahoo'
          },
          firebaseUI.auth.AnonymousAuthProvider.PROVIDER_ID
        ],
        callbacks: {
          signInSuccessWithAuthResult(authResult, redirectUrl) {
            console.log('redirectUrl: ', redirectUrl);
            console.log('authResult: ', authResult);
            return true;
          },
          uiShown() {
            const loader = document.getElementById('loader');
            if (loader) {
              loader.style.display = 'none';
            }
          },
          async signInFailure(error) {
            if (error.code !== 'firebaseui/anonymous-upgrade-merge-conflict') {
              return;
            }
            const cred = error.credential;
            await firebase
              .auth()
              .signInWithCredential(cred);
          }
        }
      };
      ui.start(`#${firebaseContainerId}`, uiConfig);
    });
  }, []);

  return <div id={firebaseContainerId} />;
}
