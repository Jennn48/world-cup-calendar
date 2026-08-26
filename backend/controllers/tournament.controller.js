import db from "../db/db.js";

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
    const result = await db.query("SELECT * FROM tournament WHERE id = $1", [id]);

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error retrieving tournaments",
    });
  }
};
