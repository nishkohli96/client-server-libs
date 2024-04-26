'use client';

/**
 * This is the default error boundary for the whole app.
 * For routes the file name for error boundary is error.tsx.
 * Unlike error.tsx, the global-error file must include the
 * head and body tags.
 *
 * global-error.js is only enabled in production.
 * In development, our error overlay will show instead.
 */

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
