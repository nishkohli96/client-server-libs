import { redirect } from 'next/navigation';
import { Locales } from '@/types';

// This page only renders when the app is built statically (output: 'export')
export default function RootPage() {
  redirect(`/${Locales.ENGLISH}`);
}
