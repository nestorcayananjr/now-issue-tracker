import { Request, Response, NextFunction, response } from 'express';
import { db } from '../models/db';
import createHttpError from 'http-errors'
import { CustomSession } from '../types/customSession'

interface projectsControllerInterface {
  getUserProjects: (req: Request, res: Response, next: NextFunction) => Promise<void>,  
  createProject: (req: Request, res: Response, next: NextFunction) => Promise<void>,
}

const projectsController: projectsControllerInterface = {
    getUserProjects: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        console.log(req.session)
        const userId = (req.session as CustomSession).userId;
        console.log(userId)
        
        try {
            const usersProjects = await db.query(`SELECT * FROM projects WHERE created_by= ${userId}`);
            res.locals.usersProjects = usersProjects.rows;
            return next()
        } catch (err) {
            return next(createHttpError(400, 'Could not fetch users projects in projectsController.getUserProjects'))
        }
      },

    createProject: async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {project_name} = req.body;
        const command = `INSERT INTO projects (project_name, created_by) VALUES ($1, $2) returning *`
        const values = [project_name, (req.session as CustomSession).userId]

        try {
            const newUser = await db.query(command, values);
            res.locals.newProject = newUser.rows[0]
            return next();
        } catch (err) {
            return next(createHttpError(400, 'Could not create a new user in usersController.createUser'))
        }
    },

}

export default projectsController;