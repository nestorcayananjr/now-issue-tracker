import authController from "../controllers/authController";
import usersController from "../controllers/usersController";
import express, { Router, Request, Response } from 'express'

const router: Router = express.Router();

// post request for registering a new user
router.post('/', authController.validateUser, (_req: Request, res: Response) => {
    res.sendStatus(200);
}) 


export default router;