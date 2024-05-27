import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { ExpressServerEndpoints } from '@csl/react-express';
import { ENV_VARS, ServerConfig } from 'app-constants';
import { requestLogger } from 'middleware';
import * as Routes from 'routes';

const app: Express = express();

function generatePath(routeName: string): string {
  return `/api${routeName}`;
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
 * This will server static assets from uploads folder.
 * So a file at "uploads/files/hi.jpeg" can be accessed at
 * http://localhost:5000/files/hi.jpeg
 *
 * If you want assets to be protected, use a middleware just
 * before using express.static. Remember, the order of
 * middleware MATTERS!
 */
app.use(express.static(path.join(__dirname, '../uploads')));

app.get('/', (_: Request, response: Response) => {
  response.status(200).send(`ENV: ${ENV_VARS.env} - Api is up & running!!!`);
});

app.use(generatePath(ExpressServerEndpoints.files.rootPath), Routes.fileRouter);

/* 404 Handler - To be written at last */
app.get('*', (req: Request, response: Response) => {
  const notFoundMsg = `Not Found - "${req.originalUrl}"`;
  response.status(404).send(notFoundMsg);
});

export default app;
