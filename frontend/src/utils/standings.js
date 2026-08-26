import { getTeamsByGroup, getMatchTeams } from "./auxiliaryFunctions.js";

/**
 * Calculates the group-stage standings for every team.
 *
 * @param {Matches[]} matches - Group-stage matches.
 * @param {Teams[]} teams - Array containing all tournament teams.
 * @param {MatchTeams[]} matchTeams - Relationship between macth and participant teams.
 * @returns {Standings[]} Current standings for all group-stage teams.
 */
function calculateStandings(matches, teams, matchTeams) {
  const table = teams.map((team) => ({
    id: team.id,
    name: team.name,
    flag: team.flagUrl,
    pj: 0,
    gf: 0,
    gc: 0,
    dg: 0,
    p: 0,
    g: 0,
    e: 0,
    ptos: 0,
  }));

  matches.forEach((match) => {
    const awayScore = match.awayScore !== null ? Number(match.awayScore) : null;
    const homeScore = match.homeScore !== null ? Number(match.homeScore) : null;
    const teamSlots = getMatchTeams(match, matchTeams, teams);

    let tableHome = table.find((team) => team.id === teamSlots.home.team.id);
    let tableAway = table.find((team) => team.id === teamSlots.away.team.id);

    //Matches played
    if (homeScore === null && awayScore === null) return;

    tableHome.pj++;
    tableAway.pj++;

    //Goals
    tableHome.gf += homeScore ?? 0;
    tableHome.gc += awayScore ?? 0;
    tableHome.dg = tableHome.gf - tableHome.gc;
    tableAway.gf += awayScore ?? 0;
    tableAway.gc += homeScore ?? 0;
    tableAway.dg = tableAway.gf - tableAway.gc;

    //Matches won, losed or points
    if (homeScore > awayScore) {
      tableHome.g += 1;
      tableHome.ptos += 3;
      tableAway.p += 1;
    } else if (homeScore < awayScore) {
      tableHome.p += 1;
      tableAway.g += 1;
      tableAway.ptos += 3;
    } else {
      tableHome.e += 1;
      tableHome.ptos += 1;
      tableAway.e += 1;
      tableAway.ptos += 1;
    }
  });

  return table;
}

export default calculateStandings;
