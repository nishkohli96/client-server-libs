import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { ENV_VARS, RouteList } from 'app-constants';
import { requestLogger } from 'middleware';
import * as Routes from 'routes';

const app: Express = express();

function generatePath(routeName: string): string {
  return `/api${routeName}`;
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(requestLogger);

app.get('/', (_: Request, response: Response) => {
  response.status(200).send(`ENV: ${ENV_VARS.env} - Api is up & running!!!`);
});

app.use(generatePath(RouteList.files.rootpath), Routes.fileRouter);

/* 404 Handler - To be written at last */
app.get('*', (req: Request, response: Response) => {
  const notFoundMsg = `Not Found - "${req.originalUrl}"`;
  response.status(404).send(notFoundMsg);
});

export default app;
