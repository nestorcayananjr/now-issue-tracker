import issuesController from "../controllers/issuesController";
import authController from "../controllers/authController";
import express, { Router, Request, Response } from 'express'

const router: Router = express.Router();

// get all projects of a user
router.get('/:projectId', issuesController.getIssuesByProject, (_req: Request, res: Response) => {
    res.status(200).json(res.locals.issues)
})

// post request for registering a new user
// router.post('/', issuesController.createProject, (_req: Request, res: Response) => {
//     res.status(200).json(res.locals.newProject)
// }) 


export default router;