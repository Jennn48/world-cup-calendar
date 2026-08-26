import db from "../db/db.js";
import { getTeamById } from "./team.controller.js";

export const getGroups = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM groups ORDER BY id");

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error retrieving groups",
    });
  }
};
export const getGroupById = async (req, res) => {
  let id = parseInt(req.params.id);

  try {
    const result = await db.query("SELECT g.id AS group_id,g.name AS group_name,g.code AS group_code,t.id AS team_id, t.name AS team_name, t.code AS team_code, t.flag_url FROM groups g LEFT JOIN group_team gt ON g.id = gt.group_id LEFT JOIN team t ON t.id = gt.team_id WHERE g.id = $1", [id]);

    if (result.rows.length) {
      res.json(result.rows);
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
    const result = await db.query(
      "SELECT t.* FROM team t JOIN group_team gt ON t.id = gt.team_id WHERE gt.group_id = $1",
      [id],
    );

    if (result.rows.length) {
      res.json(result.rows);
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
