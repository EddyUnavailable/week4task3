import express from "express"
import cors from "cors"
import pg from "pg"
import dotenv from "dotenv"
const port = process.env.port || 8080;

const express = require('express')
app.use(cors());
app.use(express.json());
const app = express();
// goes and looks for a .env file and pulls those environment variables into our node process
dotenv.config({ path: join(__dirname, ".env") });
  console.log(process.env.DB_CONN)


import { fileURLToPath } from "url";
import { dirname, join } from "path";
// import fetch from "node-fetch";

//  current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// db connection
const db = new pg.Pool({
  connectionString: process.env.DB_CONN,
  ssl: {
    rejectUnauthorized: false,
  },
});



// GET facts from database with optional category filter
app.get("/api/facts", async (req, res) => {
  //const { category } = req.query;
  try {
    const data = await db.query("SELECT * FROM facts");
     res.json(data.rows);
    //const params = [];

    // //if (category && category !== "all") {
    //   query += " WHERE category = $1";
    //   params.push(category);
    // }

    // const result = await db.query(query, params);
    // res.json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to fetch facts" });
  }
});

// POST new fact to database
app.post("/api/facts", async (req, res) => {
  console.log(req.body)
  const { fact, result } = req.body;

  //if (!text) {
  //  return res.status(400).json({ error: "Text is required" });
  //}

  try {
    await db.query("INSERT INTO facts (fact, result) VALUES ($1, $2)", [
      fact,
      result,
    ]);
    //const result = await db.query(query, [text, category || "general"]);
    res.status(201).json("Saved fact");
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to save fact" });
  }
});


