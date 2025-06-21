import { Request, Response, NextFunction } from 'express';
import { db } from '../models/db';
import createHttpError from 'http-errors'

interface usersControllerInterface {
  getAllUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>,  
//   createUser: (req: Request, res: Response, next: NextFunction) => Promise<void>,
//   validateUser: (req: Request, res: Response, next: NextFunction) => Promise<void>,
}

const usersController: usersControllerInterface = {
    getAllUsers: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const allUsers = await db.query('SELECT * FROM users');
          if (!allUsers.rowCount) throw createHttpError(400, 'Users not found');
          res.locals.fetchedUsers = allUsers.rows;
          return next()
        } catch (err) {
          return next(createHttpError(400, 'Could not fetch all users in usersController.fetchUsers'))
        }
      },
}

export default usersController;