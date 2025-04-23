import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { firebaseConfig } from '@/constants';

class FirebaseService {
  private app: FirebaseApp;

  /**
   * The Firebase JS SDK does not allow initializeApp()
   * to be called more than once in the same runtime context
   * (i.e., browser tab or Node.js instance).
   *
   * getApps() is used to check if Firebase has already been initialized.
   * If no apps exist (length === 0), it means Firebase
   * hasn't been initialized yet.
   */
  constructor() {
    this.app
      = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }

  public getApp() {
    return this.app;
  }
}

const firebaseService = new FirebaseService();
export default firebaseService;
