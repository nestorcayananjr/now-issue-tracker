import projectsController from "../controllers/projectsController";
import authController from "../controllers/authController";
import express, { Router, Request, Response } from 'express'

const router: Router = express.Router();

// get all projects of a user
router.get('/', projectsController.getUserProjects, (_req: Request, res: Response) => {
    res.status(200).json(res.locals.usersProjects)
})

// post request for creating new project
router.post('/', authController.requireAuth, projectsController.createProject, (_req: Request, res: Response) => {
    res.status(200).json(res.locals.newProject)
}) 


export default router;