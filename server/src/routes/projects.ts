import projectsController from "../controllers/projectsController";
import authController from "../controllers/authController";
import { requireAuth } from "../utils/auth";
import express, { Router, Request, Response } from 'express'

const router: Router = express.Router();

// get all projects of a user
router.get('/', requireAuth, projectsController.getUserProjects, (_req: Request, res: Response) => {
    res.status(200).json(res.locals.usersProjects)
})

// post request for creating new project
router.post('/', requireAuth, projectsController.createProject, (_req: Request, res: Response) => {
    res.status(200).json(res.locals.newProject)
}) 


export default router;