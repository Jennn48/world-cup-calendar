import db from "../db/db.js";

export const getMatchTeams = async (req, res) => {
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

export const setMatchTeamSource = async (req, res) => {
  let matchId = parseInt(req.params.id);
  let slot =req.params.slot;
  let teamId = parseInt(req.body.teamId);

  try {
    const result = await db.query(
      `UPDATE match_team
      SET team_id = $1
      WHERE match_id = $2 AND slot = $3
      RETURNING *`,
      [teamId, matchId, slot]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error retrieving matchTeams" });
  }
};