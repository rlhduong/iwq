declare global {
  interface SessionUser {
    id: string;
    firstName: string;
    lastName: string;
    favourites: string[];
  }
  namespace Express {
    interface Request {
      user?: SessionUser;
    }
  }
}

export {};
