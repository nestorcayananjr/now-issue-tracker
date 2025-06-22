import usersController from "../controllers/usersController";
import authController from "../controllers/authController";
import express, { Router, Request, Response } from 'express'

const router: Router = express.Router();

// for testing purposes to see all the users, obvs wouldn't include in a production environment
router.get('/', usersController.getAllUsers, authController.requireAuth, (_req: Request, res: Response) => {
    res.status(200).json(res.locals.fetchedUsers)
})

// post request for registering a new user
router.post('/', usersController.createUser, (_req: Request, res: Response) => {
    res.status(200).json(res.locals.newUser)
}) 


export default router;