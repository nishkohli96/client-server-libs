import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { ENV_VARS } from '@/constants';

Sentry.init({
  dsn: ENV_VARS.sentryDSN,
  integrations: [nodeProfilingIntegration()],
  /* Tracing: Capture 100% of the transactions */
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  environment: 'development'
});

export function startProfiler() {
  // Manually call startProfiler and stopProfiler
  // to profile the code in between
  Sentry.profiler.startProfiler();
}

// Starts a transaction that will also be profiled
// Sentry.startSpan({
//   name: "My First Transaction",
// }, () => {
//   // the code executing inside the transaction will be wrapped in a span and profiled
// });

// Calls to stopProfiling are optional - if you don't stop the profiler, it will keep profiling
// your application until the process exits or stopProfiling is called.
export function stopProfiler() {
  Sentry.profiler.stopProfiler();
}
