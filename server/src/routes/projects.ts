import projectsController from "../controllers/projectsController";
import express, { Router, Request, Response } from 'express'

const router: Router = express.Router();

// get all projects of a user
router.get('/', projectsController.getUserProjects, (_req: Request, res: Response) => {
    res.status(200).json(res.locals.usersProjects)
})

// // post request for registering a new user
router.post('/', projectsController.createProject, (_req: Request, res: Response) => {
    res.status(200).json(res.locals.newProject)
}) 


export default router;