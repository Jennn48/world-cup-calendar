import { getAllGroups, getOneGroupById, getAllTeamsByGroup } from "../services/group.service.js";

export const getGroups = async (req, res) => {
  try {
    const groups = await getAllGroups();

    res.json(groups);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error retrieving groups",
    });
  }
};
export const getGroupById = async (req, res) => {
  let id = Number(req.params.id);

  try {
    const group = await getOneGroupById(id);

    if (group.length) {
      res.json(group);
    } else {
      res.status(404).json({ error: "Group not found. ID must be between 1 and 12." });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error retrieving groups",
    });
  }
};

export const getTeamsByGroup = async (req, res) => {
  let id = req.params.id;
  try {
    const teams = await getAllTeamsByGroup(id);

    if (teams.length) {
      res.json(teams);
    } else {
      res.status(404).json({ error: "Group not found. ID must be between 1 and 12." });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error retrieving teams",
    });
  }
};
