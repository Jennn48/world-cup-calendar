import db from "../db/db.js";

export const getTeams = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT
      t.id,
      t.flag_url AS "flagUrl",
      t.name,
      t.code,
      g.code AS "group"
      FROM team t
      JOIN group_team gt
      ON t.id = gt.team_id
      JOIN groups g
      ON gt.group_id = g.id
      ORDER BY t.id`,
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error retrieving teams",
    });
  }
};

export const getTeamById = async (req, res) => {
  let id = parseInt(req.params.id);

  try {
    const result = await db.query("SELECT * FROM team WHERE id = $1", [id]);

    if (result.rows.length) {
      res.json(result.rows);
    } else {
      console.log(result.rows.length);
      res
        .status(404)
        .json({ error: "Team not found. ID must be between 1 and 48." });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error retrieving teams",
    });
  }
};

export const getMatchesByTeam = async (req, res) => {
  let id = parseInt(req.params.id);

  try {
    const result = await db.query(
      "SELECT m.* FROM match m JOIN match_team mt ON m.id = mt.match_id WHERE mt.team_id = $1",
      [id],
    );

    if (result.rows.length) {
      res.json(result.rows);
    } else {
      console.log(result.rows.length);
      res
        .status(404)
        .json({ error: "Team not found. ID must be between 1 and 48." });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error retrieving teams",
    });
  }
};
