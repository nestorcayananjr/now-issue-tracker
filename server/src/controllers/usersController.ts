import { Request, Response, NextFunction, response } from 'express';
import { db } from '../models/db';
import { hashPassword, verifyPassword } from '../utils/auth'
import createHttpError from 'http-errors'

interface usersControllerInterface {
  getAllUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>,  
  createUser: (req: Request, res: Response, next: NextFunction) => Promise<void>,
}

const usersController: usersControllerInterface = {
    getAllUsers: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const allUsers = await db.query('SELECT * FROM users');
            if (!allUsers.rowCount) throw createHttpError(400, 'Users not found');
            res.locals.fetchedUsers = allUsers.rows;
            return next()
        } catch (err) {
            return next(createHttpError(400, 'Could not fetch all users in usersController.getAllUsers'))
        }
      },

    createUser: async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {name, email, password} = req.body;
        const command = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) returning id`
        const values = [name, email, await hashPassword(password)]

        try {
            const newUser = await db.query(command, values);
            res.locals.newUser = newUser.rows[0].id
            return next();
        } catch (err) {
            return next(createHttpError(400, 'Could not create a new user in usersController.createUser'))
        }
    },

}

export default usersController;