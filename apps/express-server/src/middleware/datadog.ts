/**
 * Datadog captures APM (Application Performance Monitoring)
 * data using the dd-trace npm module.
 *
 * https://www.npmjs.com/package/dd-trace
 */

import tracer from 'dd-trace';
import { ENV_VARS } from '@/app-constants';
import pkgJson from '../../package.json';

/**
 * version: For tracking releases
 * logInjection: Enables logs correlation
 * runtimeMetrics: Captures runtime metrics
 */
const ddTracer = tracer.init({
  service: pkgJson.name,
  env: ENV_VARS.env,
  version: pkgJson.version,
  logInjection: true,
  // analytics: true, // Enables APM analytics
  runtimeMetrics: true,
});

export default ddTracer;
