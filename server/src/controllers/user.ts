import { Response, Request } from 'express';
import { clearSessionTokenCookie, handleLogin } from '../libs/auth';
import { cmpPassword, hashPassword } from '../libs/utils';
import { format } from 'date-fns';
import User from '../models/user';
import mongoose from 'mongoose';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        error: 'Invalid email or password',
      });
      return;
    }

    if (!cmpPassword(password, user.password)) {
      res.status(401).json({
        error: 'Invalid email or password',
      });
      return;
    }

    handleLogin(res, user._id.toString(), 'User successfully logged in');
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

export const register = async (req: Request, res: Response) => {
  const dbSession = await mongoose.startSession();
  dbSession.startTransaction();

  try {
    const { email, password, firstName, lastName } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        error: 'email already exists',
      });
      return;
    }

    const [newUser] = await User.create(
      [
        {
          email,
          password: hashPassword(password),
          firstName,
          lastName,
          createdAt: format(new Date(), 'dd/MM/yyyy'),
          favourites: [],
        },
      ],
      { session: dbSession }
    );
    await dbSession.commitTransaction();
    dbSession.endSession();
    handleLogin(res, newUser._id.toString(), 'User successfully registered');
  } catch (error) {
    await dbSession.abortTransaction();
    dbSession.endSession();
    res.status(500).json({ message: 'Error logging in', error });
  }
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
