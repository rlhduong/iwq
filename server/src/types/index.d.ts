interface SessionUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
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
