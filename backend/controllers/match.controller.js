import { getAllMatches, getAllTeamsByMatch, getOneMatchById, setOneMatchScore } from "../services/match.service.js";

export const getMatches = async (req, res) => {
  let round = req.query.round;

  try {
    const matches = await getAllMatches(round);

    res.json(matches);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error retrieving matches" });
  }
};

export const getMatchById = async (req, res) => {
  let id = Number(req.params.id);

  try {
    const match = await getOneMatchById(id);

    if (match.length) {
      res.json(match);
    } else {
      console.log(match.length);
      res
        .status(404)
        .json({ error: "Match not found. ID must be between 1 and 103." });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error retrieving matches." });
  }
};

export const getTeamsByMatch = async (req, res) => {
  let id = Number(req.params.id);

  try {
    const teams = await getAllTeamsByMatch;

    if (teams.length) {
      res.json(teams);
    } else {
      console.log(teams.length);
      res.status(404).json({ error: "Data no available yet." });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error retrieving matches." });
  }
};

export const setMatchScore = async (req, res) => {
  let id = Number(req.params.id);
  const { homeScore, awayScore } = req.body;

  const fields = [];
  const values = [];

  //Si se envia homeScore
  if (homeScore !== undefined) {
    values.push(homeScore);
    fields.push(`home_score = $${values.length}`);
  }

  if (awayScore !== undefined) {
    values.push(awayScore);
    fields.push(`away_score = $${values.length}`);
  }

  if (fields.length === 0) {
    return res.status(400).json({
      message: "No score provided",
    });
  }

  values.push(id);

  try {
    const match = await setOneMatchScore(fields, values);

    if (match.length) {
      res.json(match);
    } else {
      console.log(match.length);
      res.status(404).json({ error: "Match not found." });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error updating match." });
  }
};
