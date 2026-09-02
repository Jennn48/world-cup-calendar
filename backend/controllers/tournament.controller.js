import db from "../db/db.js";
import { getAllTournaments, getOneTournament, reset, set } from "../services/tournament.service.js";

export const getTournaments = async (req, res) => {
  try {
    const tournaments = await getAllTournaments();

    res.json(tournaments);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error retrieving tournaments",
    }); 
  }
};

export const getTournamentById = async (req, res) => {
  let id = Number(req.params.id);

  try {
    const tournament = await getOneTournament(id);

    res.json(tournament);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error retrieving tournaments",
    });
  }
};

export const resetTournament = async (req, res) => {
  try {
    await reset();

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
    await set();

    res.json({
      message: "Real tournament loaded successfully."
    });
  } catch (error) {
    await db.query("ROLLBACK");
    console.error(error);

    res.status(500).json({ error: "Error loading real tournament" });
  }
};
