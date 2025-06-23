import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users'
import authRouter from './routes/auth'
import projectsRouter from './routes/projects'
import issuesRouter from './routes/issues'
import session from 'express-session'

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600 * 1000,
    httpOnly: true,
    // this option would be set to true in a production environment
    secure: false
  }
}))

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/issues', issuesRouter);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
