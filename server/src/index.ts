import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users'
// const projectsRouter = require('./routes/projects')
// const issuesRouter = require('./routes/issues')

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
// app.use('/api/projects', projectsRouter);
// app.use('/api/issues', issuesRouter);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
