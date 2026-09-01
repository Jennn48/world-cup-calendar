import { error } from "node:console";
import db from "../db/db.js";

export const getMatches = async (req, res) => {
  let round = req.query.round;

  try {
    const result = await db.query(
      `SELECT
    m.id,
    m.round,
    g.code AS "groupCode",
    m.match_date AS "matchDate",
    m.match_time AS "matchTime",
    m.home_score AS "homeScore",
    m.away_score AS "awayScore",
    m.match_number AS "matchNumber",
    m.status
FROM match m
LEFT JOIN groups g
    ON m.group_id = g.id
    WHERE ($1::text IS NULL OR round = $1)
    ORDER BY m.id`,
      [round ?? null],
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error retrieving matches" });
  }
};

export const getMatchById = async (req, res) => {
  let id = parseInt(req.params.id);

  try {
    const result = await db.query("SELECT * FROM match WHERE id = $1", [id]);

    if (result.rows.length) {
      res.json(result.rows);
    } else {
      console.log(result.rows.length);
      res
        .status(404)
        .json({ error: "Match not found. ID must be between 1 and 103." });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error retrieving matches." });
  }
};

export const getTeamsByMatch = async (req, res) => {
  let id = parseInt(req.params.id);

  try {
    const result = await db.query(
      "SELECT t.* FROM team t JOIN match_team mt ON t.id = mt.team_id WHERE mt.match_id = $1",
      [id],
    );

    if (result.rows.length) {
      res.json(result.rows);
    } else {
      console.log(result.rows.length);
      res.status(404).json({ error: "Data no available yet." });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error retrieving matches." });
  }
};

export const setMatchScore = async (req, res) => {
  let id = parseInt(req.params.id);
  const { homeScore, awayScore } = req.body;

  const fields = [];
  const values = [];

  //Si se envia homeScore
  if (homeScore !== undefined) {
    values.push(homeScore);
    fields.push(`home_score = $${values.length}`);
  }

  if (awayScore !== undefined) {
    values.push(awayScore);
    fields.push(`away_score = $${values.length}`);
  }

  if (fields.length === 0) {
    return res.status(400).json({
      message: "No score provided",
    });
  }

  values.push(id);

  try {
    const result = await db.query(
      `UPDATE match
      SET ${fields.join(", ")}
      WHERE id = $${values.length}
      RETURNING *
      `,
      values,
    );

    if (result.rows.length) {
      res.json(result.rows);
    } else {
      console.log(result.rows.length);
      res.status(404).json({ error: "Match not found." });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error updating match." });
  }
};
