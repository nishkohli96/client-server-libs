import express, { Express, Request, Response } from 'express';
import cors from 'cors';
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
  limit: ServerConfig.maxFieldLimit
}));
app.use(express.urlencoded({
  limit: ServerConfig.maxFieldLimit,
  extended: true
}));

app.use(cors());
app.use(requestLogger);

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
