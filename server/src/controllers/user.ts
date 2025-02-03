import { Response, Request } from 'express';
import { clearSessionTokenCookie, handleLogin } from '../libs/auth';
import { cmpPassword, hashPassword } from '../libs/utils';
import User from '../models/user';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const query = await User.scan('email').eq(email).exec();

  if (query && query.length === 0) {
    res.status(401).json({
      error: 'Invalid email or password',
    });
    return;
  }

  const user = query[0].toJSON();
  if (!cmpPassword(password, user.password)) {
    res.status(401).json({
      error: 'Invalid email or password',
    });
    return;
  }

  handleLogin(res, user.userId, 'User successfully logged in');
};

export const register = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;
  const query = await User.scan('email').eq(email).exec();

  if (query && query.length > 0) {
    res.status(401).json({
      error: 'email already exists',
    });
    return;
  }

  const user = new User({
    userId: uuidv4(),
    email,
    password: hashPassword(password),
    firstName,
    lastName,
    createdAt: format(new Date(), 'dd/MM/yyyy'),
    favourites: [],
  });
  await user.save();
  handleLogin(res, user.userId, 'User successfully registered');
};

export const logout = async (req: Request, res: Response) => {
  clearSessionTokenCookie(req, res);
  res.status(200).json({
    data: 'User successfully logged out',
  });
};

export const status = async (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: 'User is logged in', data: req.user || null });
};
