import { getAllMatchTeams, setOneMatchTeamSource } from "../services/matchTeam.service.js";


export const getMatchTeams = async (req, res) => {
  try {
    const matchTeams = await getAllMatchTeams();

    res.json(matchTeams);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error retrieving matchTeams" });
  }
};

export const setMatchTeamSource = async (req, res) => {
  let matchId = Number(req.params.id);
  let slot =req.params.slot;
  let teamId = Number(req.body.teamId);

  try {
    const matchTeam = setOneMatchTeamSource(teamId, matchId, slot);

    res.json(matchTeam);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error retrieving matchTeams" });
  }
};