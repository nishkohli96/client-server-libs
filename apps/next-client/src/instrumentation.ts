import * as Sentry from '@sentry/nextjs';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('../sentry.server.config');
  }

  /**
   * When NEXT_RUNTIME is set to "edge", it means the function
   * is running on Edge Runtime (Vercel Edge Functions,
   * Cloudflare Workers, etc.), rather than a traditional Node.js
   * environment.
   *
   * ✅ When to Use Edge Runtime?
   * Fast API responses (e.g., authentication, redirects)
   * Personalized content (A/B testing, geolocation-based data)
   * Rate limiting & caching (Handle requests closer to users)
   */
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('../sentry.edge.config');
  }
}

export const onRequestError = Sentry.captureRequestError;
