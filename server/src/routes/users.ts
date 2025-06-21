import usersController from "../controllers/usersController";
import express, { Router, Request, Response } from 'express'

const router: Router = express.Router();

router.get('/', usersController.getAllUsers, (_req: Request, res: Response) => {
    res.status(200).json(res.locals.fetchedUsers)
})

export default router;