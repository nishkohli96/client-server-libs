'use client';

import { getAnalytics, isSupported } from 'firebase/analytics';
import firebaseService from '@/services/firebase';

let analyticsInstance: ReturnType<typeof getAnalytics> | null = null;

export async function getFirebaseAnalytics() {
  if (typeof window !== 'undefined' && (await isSupported())) {
    if (!analyticsInstance) {
      analyticsInstance = getAnalytics(firebaseService.getApp());
    }
    return analyticsInstance;
  }
  return null;
}
