import db from "../db/db.js";

export const getAllGroups = async () => {
  const result = await db.query(`SELECT * FROM groups ORDER BY id`);

  return result.rows;
};

export const getOneGroupById = async (id) => {
  const result = await db.query(
    `SELECT g.id AS group_id,g.name AS group_name,g.code AS group_code,t.id AS team_id, t.name AS team_name, t.code AS team_code, t.flag_url FROM groups g LEFT JOIN group_team gt ON g.id = gt.group_id LEFT JOIN team t ON t.id = gt.team_id WHERE g.id = $1`,
    [id],
  );

  return result.rows;
};

export const getAllTeamsByGroup = async (id) => {
  const result = await db.query(
    `SELECT t.* FROM team t JOIN group_team gt ON t.id = gt.team_id WHERE gt.group_id = $1`,
    [id],
  );

  return result.rows;
};
