import usersController from "../controllers/usersController";
import express, { Router, Request, Response } from 'express'

const router: Router = express.Router();

// post request for registering a new user
router.post('/', usersController.createUser, (_req: Request, res: Response) => {
    res.status(200).json(res.locals.newUser)
}) 


export default router;