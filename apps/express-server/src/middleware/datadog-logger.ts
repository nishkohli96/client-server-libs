import { createLogger, format, transports } from 'winston';

const httpTransportOptions = {
  host: 'http-intake.logs.datadoghq.com',
  path: '/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=nodejs&service=<>',
  ssl: true
};

export const dataDogLogger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.Http(httpTransportOptions),
  ],
});
