import express from 'express';
const { PORT } = require("./env");
import router from "./routes";
import pool from "./db";
import { readFile } from 'fs';
import path from "path";

let queries;
const read = (fp: string) => {
  readFile(path.join(__dirname, fp), (err, file) => {
    if(err) throw err;
    queries = file;
    console.log(file, queries);
  })
}

(async () => {
  const client = await pool.connect();
  const app = express();
  try {
    const res = await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await client.query("DROP TABLE URLs");
    await client.query(`CREATE TABLE URLs (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      url TEXT NOT NULL,
      short char(6) NOT NULL
      )`);
    //console.log(res.rows[0]);
    app.use(router);

    app.listen(PORT, () => {
      console.log(`URL Shortener Server running on port ${PORT}`);
    });

  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    //await client.query("DROP TABLE URLs");
    client.release()
  }
})().catch(err => console.error(err))
