import { Request, Response, NextFunction, response } from 'express';
import { db } from '../models/db';
import { hashPassword, verifyPassword } from '../utils/auth'
import createHttpError from 'http-errors'

interface usersControllerInterface {
  createUser: (req: Request, res: Response, next: NextFunction) => Promise<void>,
}

const usersController: usersControllerInterface = {
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