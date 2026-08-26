import db from "../db/db.js";

const getTeams = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM team ORDER BY id"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error retrieving teams",
    });
  }
};

export default getTeams;