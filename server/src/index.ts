import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

app.use(cors());
app.use(express.json());

app.get('/api', async (_req, res) => {
  res.send("received");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
