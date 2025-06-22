import { Request, Response, NextFunction } from 'express';
import { db } from '../models/db';
import createHttpError from 'http-errors'


interface issuesControllerInterface {
  getIssuesByProject: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  createIssue: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  updateIssue: (req: Request, res: Response, next: NextFunction) => Promise<void>,
}

const issuesController: issuesControllerInterface = {
    getIssuesByProject: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const project_id = req.params.projectId
        const command = `SELECT * FROM issues WHERE project_id = $1`;
        try {
            const allIssuesByProject = await db.query(command, [project_id])
            res.locals.issues = allIssuesByProject.rows;
            return next()
        } catch(err){
            return next(createHttpError(400, 'Error in issuesController.getIssuesByProject'))
        }
    },

    createIssue: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { title, issue_description, status, project_id } = req.body;
        const command = `INSERT INTO issues (title, issue_description, status, project_id) VALUES ($1, $2, $3, $4) returning *`
        const values = [title, issue_description, status, project_id]

        try {
            const newIssue = await db.query(command, values);
            res.locals.newIssue = newIssue.rows[0];
            return next()
        } catch (err) {
            return next(createHttpError(400, 'Could not create a new issue in issuesController.createIssue'))
        }
    },

    updateIssue: async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        const issueId = req.params.issueId;
        const { title, issue_description, status } = req.body;
        const command = `UPDATE issues SET title=$1, issue_description=$2, status=$3 WHERE id=$4 RETURNING *`
        const values = [title, issue_description, status, issueId]
        try {
            const updatedIssue = await db.query(command, values);
            res.locals.updatedIssue = updatedIssue.rows[0];
            return next()
        } catch (error) {
            return next(createHttpError(400, 'Could not update issue in issuesController.updateIssue'))
        }
    }
}

export default issuesController;