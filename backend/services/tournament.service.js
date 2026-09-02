import db from "../db/db.js";
import { realResults } from "../data/realTournament.js";
export const getAllTournaments = async () => {
  const result = await db.query(`SELECT * FROM tournament ORDER BY id`);

  return result.rows;
};

export const getOneTournament = async (id) => {
  const result = await db.query(`SELECT * FROM tournament WHERE id = $1`, [id]);

  return result.rows;
};

export const reset = async () => {
  await db.query("BEGIN");

  await db.query(`
      UPDATE match
      SET home_score = NULL,
          away_score = NULL
    `);

  await db.query(`
      UPDATE match_team
      SET team_id = NULL
      WHERE source IS NOT NULL
    `);

  await db.query("COMMIT");
};

export const set = async () => {
  await db.query("BEGIN");

  for (const match of realResults) {
    await db.query(
      `UPDATE match 
        SET home_score = $1,
            away_score = $2
        WHERE id = $3`,
      [match.homeScore, match.awayScore, match.matchId],
    );
  }

  await db.query("COMMIT");
};
