import { getAllTeams, getOneTeamById, getAllMatchesByTeam } from "../services/team.service.js";

export const getTeams = async (req, res) => {
  try {
    const teams = await getAllTeams();
    res.json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error retrieving teams",
    });
  }
};

export const getTeamById = async (req, res) => {
  let id = Number(req.params.id);

  try {
    const team = await getOneTeamById(id);

    if (team.length) {
      res.json(team);
    } else {
      console.log(team.length);
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
  let id = Number(req.params.id);

  try {
    const matches = await getAllMatchesByTeam(id);

    if (matches.length) {
      res.json(matches);
    } else {
      console.log(matches.length);
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
