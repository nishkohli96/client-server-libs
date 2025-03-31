import { type Request, type Response, type NextFunction } from 'express';

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
