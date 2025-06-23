import { Request, Response, NextFunction } from 'express';
import { db } from '../models/db';
import { verifyPassword } from '../utils/auth'
import createHttpError from 'http-errors'
import { CustomSession } from '../types/customSession'


interface authControllerInterface {
  validateUser: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  requireAuth: (req: Request, res: Response, next: NextFunction) => Promise<void>,
}

const authController: authControllerInterface = {
    validateUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {email, password} = req.body;
        const command = `SELECT id, password FROM users WHERE email = $1`;

        try {
            const storedPassword = await db.query(command, [email])
            const validPassword = await verifyPassword(password, storedPassword.rows[0].password)

            if (validPassword){
                const session = (req.session as CustomSession);

                // create the session and store the user id on it
                session.userId = storedPassword.rows[0].id
                return next();
            } else {
                return next(createHttpError(400, 'Invalid email or password!'))
            }
        } catch(err){
            return next(createHttpError(400, 'Error in authController.validateUser'))
        }
    },

    requireAuth: async (req: Request, _res: Response, next: NextFunction): Promise<void> => {

        const session = (req.session as CustomSession);
        if (!session.userId){
            return next(createHttpError(401, 'Unauthorized'))
        } else {
            return next();
        }
    }
}

export default authController;