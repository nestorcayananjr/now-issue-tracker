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
        const userId = (req.session as CustomSession).userId;
        
        try {
            // here for testing purposes because can't figure out how to persist sessions/cookies on postman
            // const usersProjects = await db.query(`SELECT * FROM projects WHERE created_by = 1`);
            const usersProjects = await db.query(`SELECT * FROM projects WHERE user_id = ${userId}`);
            res.locals.usersProjects = usersProjects.rows;
            return next()
        } catch (err) {
            return next(createHttpError(400, 'Could not fetch users projects in projectsController.getUserProjects'))
        }
      },

    createProject: async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {project_name} = req.body;
        const command = `INSERT INTO projects (project_name, created_by) VALUES ($1, $2) returning id`
        const values = [project_name, (req.session as CustomSession).userId]
        // const values = [project_name, 1]

        try {
            const newUser = await db.query(command, values);
            res.locals.newProject = newUser.rows[0].id
            return next();
        } catch (err) {
            return next(createHttpError(400, 'Could not create a new user in usersController.createUser'))
        }
    },

}

export default projectsController;