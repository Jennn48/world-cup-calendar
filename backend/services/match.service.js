import db from "../db/db.js";

export const getAllMatches = async (round) => {
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

  return result.rows;
};

export const getOneMatchById = async (id) => {
  const result = await db.query(
    `SELECT * FROM match WHERE id = $1`,
    [id],
  );

  return result.rows;
};

export const getAllTeamsByMatch = async (id) => {
  const result = await db.query(
    `SELECT t.* FROM team t JOIN match_team mt ON t.id = mt.team_id WHERE mt.match_id = $1`,
    [id],
  );

  return result.rows;
};

export const setOneMatchScore = async (fields, values) => {
  const result = await db.query(
    `UPDATE match
      SET ${fields.join(", ")}
      WHERE id = $${values.length}
      RETURNING *
      `,
      values,
  );

  return result.rows;
};

