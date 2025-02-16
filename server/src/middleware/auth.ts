import { Response, Request, NextFunction } from 'express';
import { validateSessionToken, clearSessionTokenCookie } from '../libs/auth';

export const csrfProtection = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method !== 'GET') {
    const origin = req.get('Origin');

    if (origin === null || origin !== 'https://example.com') {
      res.status(403).send({ message: 'CSRF protection' });
      return;
    }
  }

  next();
};

export const sessionValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;
  const token = cookies?.session;

  if (!token) {
    res.status(401).json({
      error: {
        message: 'Unauthorized: Missing session token',
      },
    });
    return;
  }

  const { session, user } = await validateSessionToken(token);
  if (!session || !user) {
    clearSessionTokenCookie(req, res);
    res.status(401).json({
      error: {
        message: 'Unauthorized: Invalid session token',
      },
    });
    return;
  }

  req.user = {
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    favourites: user.favourites,
    email: user.email,
  };

  next();
};
