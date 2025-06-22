import { Request, Response, NextFunction } from 'express';
import { db } from '../models/db';
import { verifyPassword } from '../utils/auth'
import createHttpError from 'http-errors'
import { CustomSession } from '../types/customSession'


interface issuesControllerInterface {
  getIssuesByProject: (req: Request, res: Response, next: NextFunction) => Promise<void>,
//   requireAuth: (req: Request, res: Response, next: NextFunction) => Promise<void>,
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

    // requireAuth: async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    //     const session = (req.session as CustomSession);

    //     if (!session.userId){
    //         return next(createHttpError(401, 'Unauthorized'))
    //     }
    //     return next();
    // }
}

export default issuesController;