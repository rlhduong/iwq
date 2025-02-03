const {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} = require('@oslojs/encoding');
const { sha256 } = require('@oslojs/crypto/sha2');

import { Request, Response } from 'express';
import Session from '../models/session';
import User from '../models/user';

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(token: string, userId: string) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

  const session = new Session({
    sessionId,
    userId,
    expiresAt: Math.floor(expiresAt.getTime() / 1000),
  });
  session.save();

  return session;
}

export async function validateSessionToken(token: string) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session = await Session.get(sessionId);

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

  if (Date.now() >= session.expiresAt * 1000 - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    session.expiresAt = Math.floor(session.expiresAt.getTime() / 1000);
    await session.save();
  }

  const user = await User.get(session.userId);
  return {
    session,
    user,
  };
}

export async function invalidateSession(sessionId: string) {
  await Session.delete(sessionId);
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
  setSessionTokenCookie(res, token, session.expiresAt);
  res.status(200).json({ data: { message } });
}
