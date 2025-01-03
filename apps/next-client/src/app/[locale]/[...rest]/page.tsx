/**
 * Provide a localized 404 page by adding a not-found file within the
 * [locale] folder. Without this, the default 404 page will be shown.
 */
import { notFound } from 'next/navigation';

export default function CatchAllPage() {
  notFound();
}
