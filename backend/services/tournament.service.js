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

  const values = realResults
      .map(
        (_, index) =>
          `($${index * 3 + 1}::integer, $${index * 3 + 2}::integer, $${index * 3 + 3}::integer)`
      )
      .join(", ");

    const params = realResults.flatMap((match) => [
      match.homeScore,
      match.awayScore,
      match.matchId,
    ]);

    await db.query(
      `
      UPDATE match AS m
      SET
        home_score = v.home_score,
        away_score = v.away_score
      FROM (
        VALUES ${values}
      ) AS v(home_score, away_score, id)
      WHERE m.id = v.id
      `,
      params
    );

    await db.query("COMMIT");
};
