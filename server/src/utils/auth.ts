import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'
import { CustomSession } from '../types/customSession';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}

export async function requireAuth (req: Request, _res: Response, next: NextFunction): Promise<void> {
  const session = (req.session as CustomSession);
  if (!session.userId){
      return next(createHttpError(401, 'Unauthorized'))
  } else {
      return next();
  }
}