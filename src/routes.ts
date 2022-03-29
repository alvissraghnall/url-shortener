import { Router } from "express";
import type { Request, Response } from "express";
import { randomBytes } from "crypto";
import pool from "./db";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { url } = req.query;
    const shorted = randomBytes(3).toString('hex');
    const shortedExists = await pool.query("SELECT short from URLs WHERE short = $1", [shorted]);
    if(shortedExists.rows.length > 0) {
      return res.redirect(301, `/?url=${url}`)
    }

    const saved = await pool.query("INSERT INTO URLs (url, short) VALUES ($1, $2) RETURNING *", [url, shorted]);
    
    return res.status(203).json({
      shortedURL: saved.rows[0].short
    });
  } catch (e) {
    const err = e as Error;
    console.error(err);
  }
});

router.get("/:shorted", (req: Request, res: Response) => {
  const shortedExists = await pool.query("SELECT * from URLs WHERE short = $1", [shorted]);
  if(shortedExists.rows.length === 0) {
    return res.status(404).send("URL not found on this server.");
  }
  
})


export default router;
