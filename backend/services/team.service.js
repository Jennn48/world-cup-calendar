import db from "../db/db.js";
export const getAllTeams = async () => {
  const result = await db.query(`SELECT
      t.id,
      t.flag_url AS "flagUrl",
      t.name,
      t.code,
      g.code AS "group"
      FROM team t
      JOIN group_team gt
      ON t.id = gt.team_id
      JOIN groups g
      ON gt.group_id = g.id
      ORDER BY t.id`);

  return result.rows;
};

export const getOneTeamById = async (id) => {
  const result = await db.query(
    `
    SELECT *
    FROM team
    WHERE id = $1
    `,
    [id],
  );

  return result.rows[0];
};

export const getAllMatchesByTeam = async (teamId) => {
  const result = await db.query(
    `
    SELECT m.* FROM match m JOIN match_team mt ON m.id = mt.match_id WHERE mt.team_id = $1
    `,
    [teamId],
  );

  return result.rows;
};
