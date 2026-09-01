import db from "../db/db.js";
import { realResults } from "../data/realTournament.js";

export const getTournaments = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tournament ORDER BY id");

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error retrieving tournaments",
    });
  }
};

export const getTournamentById = async (req, res) => {
  let id = parseInt(req.params.id);

  try {
    const result = await db.query("SELECT * FROM tournament WHERE id = $1", [
      id,
    ]);

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error retrieving tournaments",
    });
  }
};

export const resetTournament = async (req, res) => {
  try {
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

    res.json({
      message: "Tournament reset successfully",
    });
  } catch (error) {
    await db.query("ROLLBACK");

    console.error(error);

    res.status(500).json({
      message: "Error resetting tournament",
    });
  }
};

export const setRealTournament = async (req, res) => {
  try {
    await db.query("BEGIN");

    for (const match of realResults) {
      await db.query(
        `UPDATE match 
        SET home_score = $1,
            away_score = $2
        WHERE id = $3`,[
          match.homeScore,
          match.awayScore,
          match.matchId
        ]
      );
    }

    await db.query("COMMIT");

    res.json({
      message: "Real tournament loaded successfully."
    });
  } catch (error) {
    await db.query("ROLLBACK");
    console.error(error);

    res.status(500).json({ error: "Error loading real tournament" });
  }
};
