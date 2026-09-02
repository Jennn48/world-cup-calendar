import db from "../db/db.js";

export const getAllMatchTeams = async () => {
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

  return result.rows;
};

export const setOneMatchTeamSource = async (teamId, matchId, slot) => {
  const result = await db.query(
    `UPDATE match_team
      SET team_id = $1
      WHERE match_id = $2 AND slot = $3
      RETURNING *`,
    [teamId, matchId, slot],
  );

  return result.rows;
};
