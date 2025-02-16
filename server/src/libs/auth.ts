const {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} = require('@oslojs/encoding');
const { sha256 } = require('@oslojs/crypto/sha2');
import { Request, Response } from 'express';
import Session from '../models/session';
import User from '../models/user';
import mongoose from 'mongoose';

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(token: string, userId: string) {
  const dbSession = await mongoose.startSession();
  dbSession.startTransaction();
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const expiresAt = Math.floor((Date.now() + 1000 * 60 * 60 * 24 * 30) / 1000);

  try {
    const [session] = await Session.create([{ sessionId, expiresAt, userId }], {
      session: dbSession,
    });
    await dbSession.commitTransaction();
    return session;
  } catch (error) {
    dbSession.abortTransaction();
    console.error(error);
  } finally {
    dbSession.endSession();
  }
}

export async function validateSessionToken(token: string) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session = await Session.findOne({ sessionId });

  if (!session) {
    return {
      session: null,
      user: null,
    };
  }

  if (Date.now() >= session.expiresAt * 1000) {
    return {
      session: null,
      user: null,
    };
  }

  const dbSession = await mongoose.startSession();
  dbSession.startTransaction();

  try {
    if (Date.now() >= session.expiresAt * 1000 - 1000 * 60 * 60 * 24 * 15) {
      const expiresAt = Math.floor(
        (Date.now() + 1000 * 60 * 60 * 24 * 30) / 1000
      );

      await Session.updateOne(
        { sessionId },
        { expiresAt },
        { session: dbSession }
      );

      await dbSession.commitTransaction();
      session.expiresAt = expiresAt;
    }
  } catch (error) {
    await dbSession.abortTransaction();
    console.error(error);
  } finally {
    dbSession.endSession();
  }

  const user = await User.findById(session.userId);
  return {
    session,
    user,
  };
}

export async function invalidateSession(sessionId: string) {
  const dbSession = await mongoose.startSession();
  dbSession.startTransaction();

  try {
    await Session.deleteOne({ sessionId }, { session: dbSession });
    await dbSession.commitTransaction();
  } catch (error) {
    await dbSession.abortTransaction();
    console.error('Error deleting session:', error);
  } finally {
    dbSession.endSession();
  }
}

export function setSessionTokenCookie(
  response: Response,
  token: string,
  expiresAt: number
): void {
  const production = process.env.NODE_ENV === 'production';
  const expiresDate = new Date(expiresAt * 1000);

  response.cookie('session', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: production,
    expires: expiresDate,
    path: '/',
  });
}

export function clearSessionTokenCookie(req: Request, res: Response): void {
  const cookies = req.cookies;
  const token = cookies?.session;
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  invalidateSession(sessionId);
  res.clearCookie('session', { path: '/' });
}

export async function handleLogin(
  res: Response,
  userId: string,
  message: string
) {
  const token = generateSessionToken();
  const session = await createSession(token, userId);
  setSessionTokenCookie(res, token, session?.expiresAt || 0);
  res.status(200).json({ data: { message } });
}
