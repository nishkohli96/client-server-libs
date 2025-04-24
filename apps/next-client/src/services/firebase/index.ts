// services/firebase.ts
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { firebaseConfig } from '@/constants';

class FirebaseService {
  private firebaseApp: FirebaseApp;

  constructor() {
    this.firebaseApp
      = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }

  public getApp() {
    return this.firebaseApp;
  }

  /* Analytics must be called client-side only */
  public async getAnalyticsInstance() {
    if (typeof window === 'undefined') {
      return null;
    }
    const { getAnalytics, isSupported } = await import('firebase/analytics');
    if (await isSupported()) {
      return getAnalytics(this.firebaseApp);
    }
    return null;
  }
}

const firebaseService = new FirebaseService();
export default firebaseService;
