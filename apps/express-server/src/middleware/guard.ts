import { Request, Response, NextFunction } from 'express';
import { winstonLogger } from './winston-logger';

export function validateAuthHeader(
  req: Request<object, object, object, object>,
  res: Response,
  next: NextFunction
) {
  /* Check presence of jwt and refresh-token */
  const token: string | undefined = req.cookies?.jwt;

  if (!token) {
    const errorMsg = 'Unauthorized request';
    winstonLogger.error(errorMsg);
    return res.status(401).send(errorMsg)
      .end();
  }
  /* Set user info after extracting his details from token */
  // res.locals.user = userInfo;
  next();
}

export function authenticateAdmin(
  _: Request<object, object, object, object>,
  res: Response,
  next: NextFunction
) {
  if (res.locals?.user?.role === 'Admin') {
    next();
  } else {
    const errMsg = 'FORBIDDEN from accessing Admin route';
    winstonLogger.error(errMsg);
    res.status(403).send(errMsg)
      .end();
  }
}

export function checkTokenMismatchInReqParams(
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  req: Request<any, object, object, object>,
  res: Response,
  next: NextFunction
) {
  if (res.locals?.user?._id !== req.params.id) {
    return res.status(406).send('Token Mismatch')
      .end();
  }
  next();
}

const excludedRoutes = ['/health/abc', '/public'];

/* Custom middleware to check for a specific header */
export const checkHeaderMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requiredHeader = 'x-custom-header';

  if (excludedRoutes.includes(req.path)) {
    return next();
  }

  if (req.headers[requiredHeader]) {
    next();
  } else {
    res.status(403).send('Forbidden: Missing required header');
  }
};
