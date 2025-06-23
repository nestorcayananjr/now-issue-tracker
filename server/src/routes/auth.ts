import authController from "../controllers/authController";
import express, { Router, Request, Response } from 'express'

const router: Router = express.Router();

// post request for a user logging in
router.post('/', authController.validateUser, (_req: Request, res: Response) => {
    res.sendStatus(200);
}) 


export default router;