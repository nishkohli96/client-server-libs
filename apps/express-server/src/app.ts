import express, { type Request, type Response } from 'express';
import cors from 'cors';
import path from 'path';
import * as Sentry from '@sentry/node';
import { ExpressServerEndpoints } from '@csl/react-express';
import { ENV_VARS, ServerConfig } from '@/constants';
import { requestLogger } from '@/middleware';
import { routesArray } from '@/routes';
import { io } from '.';

const app = express();

function generatePath(routeName: string): string {
  return `${ExpressServerEndpoints.apiPrefix}${routeName}`;
}

/**
 * To increase the limit of fieldSize in multer,
 * ensure that Express can handle large JSON and
 * URL-encoded payloads.
 */
app.use(express.json({
  /* Can also write as "10mb" */
  limit: ServerConfig.multer.maxFieldLimit
}));
app.use(express.urlencoded({
  limit: ServerConfig.multer.maxFieldLimit,
  extended: true
}));

app.use(cors());
app.use(requestLogger);

/**
 * This will server static assets from public folder.
 * So a file at "public/files/hi.jpeg" can be accessed at
 * http://localhost:8000/files/hi.jpeg
 *
 * If you want assets to be protected, use a middleware just
 * before using express.static. Remember, the order of
 * middleware MATTERS!
 */
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (_: Request, response: Response) => {
  io.emit('noArg');
  response.status(200).json({
    env: ENV_VARS.env,
    message: 'Api is up & running!!!'
  });
});

/* Require App to use all routes from the routesArray. */
routesArray.forEach(route =>
  app.use(generatePath(route.rootPath), route.router));

app.get('/debug-sentry', function mainHandler() {
  throw new Error('My first Sentry error!');
});

/* 404 Handler */
app.get('*', (req: Request, response: Response) => {
  const notFoundMsg = `Not Found - "${req.originalUrl}"`;
  response.status(404).send(notFoundMsg);
});

/**
 * The error handler must be registered before any other error middleware
 * and after all controllers.
 */
Sentry.setupExpressErrorHandler(app);

/* Optional fallthrough error handler */
// app.use(function onError(
//   err: Error,
//   req: Request,
//   res: Response,
//   // next: NextFunction
// ) {
//   /**
//    * The error id is attached to `res.sentry` to be returned
//    * and optionally displayed to the user for support.
//    */
//   res.statusCode = 500;
//   // @ts-ignore
//   console.log('res.sentry: ', res.sentry, typeof res.sentry);
//   // @ts-ignore
//   res.end(res.sentry + '\n');
// });

export default app;

