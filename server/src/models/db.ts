import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const db = {
    query: async (queryStr: string, values?: unknown[]): Promise<QueryResult<any>> => {
      try {
        const result = await pool.query(queryStr, values);
        return result;
      } catch (error) {
        console.error('Error in db query:', error)
        throw error;
      }
    }
  };