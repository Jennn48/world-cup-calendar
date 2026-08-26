import db from "../db/db.js";

export const getMatchTeams = async (req, res) => {
  let round = req.query.round;

  try {
    const result = await db.query(
      `SELECT
      id,
      slot,
      source,
      match_id AS "matchId",
      team_id AS "teamId"
    FROM match_team
    ORDER BY id`,
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error retrieving matchTeams" });
  }
};
