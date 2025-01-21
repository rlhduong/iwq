interface SessionUser {
  id: string;
  firstName: string;
  lastName: string;
  favourites: string[];
}
declare global {
  namespace Express {
    interface Request {
      user?: SessionUser;
    }
  }
}

export { SessionUser };
