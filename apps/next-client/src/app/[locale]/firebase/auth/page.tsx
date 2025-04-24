'use client';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // ✅ Required to use firebase.auth
import firebaseUI from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

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

  const ui = new firebaseUI.auth.AuthUI(firebase.auth());
  ui.start(`#${firebaseContainerId}`, uiConfig);

  return <div id={firebaseContainerId} />;
}
