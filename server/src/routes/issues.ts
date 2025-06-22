import issuesController from "../controllers/issuesController";
import authController from "../controllers/authController";
import express, { Router, Request, Response } from 'express'

const router: Router = express.Router();

// get all issues of a project
router.get('/:projectId', issuesController.getIssuesByProject, (_req: Request, res: Response) => {
    res.status(200).json(res.locals.issues)
})

// post request for creating a new issue
router.post('/', authController.requireAuth, issuesController.createIssue, (_req: Request, res: Response) => {
    res.status(200).json(res.locals.newIssue)
})

// patch request for updating issue
router.patch('/:issueId', authController.requireAuth, issuesController.updateIssue, (_req: Request, res: Response) => {
    res.status(200).json(res.locals.updatedIssue)
})


export default router;