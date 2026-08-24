/**
 * Finds a team by its unique identifier.
 *
 * @param {Team[]} teams - Array containing all tournament teams.
 * @param {number} id - Identifier of the team to find.
 * @returns {Team|undefined} The matching team, or undefined when no team exists
 * with the specified identifier.
 */
export function getTeamById(teams, id) {
  return teams.find((team) => team.id === id);
}

/**
 * Returns all teams belonging to a specific group.
 *
 * @param {Team[]} teams - Array containing all tournament teams.
 * @param {string} group - Group to filter by.
 * @returns {Team[]} Teams belonging to the requested group.
 */
export function getTeamsByGroup(teams, group) {
  return teams.filter((team) => team.group === group);
}

/**
 * 
 * @param {match} match - Match whose participants must be resolved.
 * @param {MatchTeams[]} matchTeams - Relationship between macth and participant teams.
 * @param {Team[]} teams - Array containing all tournament teams.
 * @returns {
 *   home: {source,teamId,team},
 *   away: {source,teamId,team}
 * } The home and away participant information.
 */
export function getMatchTeams(match, matchTeams, teams) {
  //If groupCode is null, diffrent stage
  let matchTeamSlots = matchTeams.filter((mt) => mt.matchId === match.id);
  let teamHomeId = matchTeamSlots.find((mts) => mts.slot === "home").teamId;
  let teamAwayId = matchTeamSlots.find((mts) => mts.slot === "away").teamId;
  if (match.groupCode === null) {
    return {
      home: {
        source: matchTeams.find(
          (mt) => mt.matchId === match.id && mt.slot === "home",
        ).source,
        teamId: teamHomeId,
        team: null,
      },
      away: {
        source: matchTeams.find(
          (mt) => mt.matchId === match.id && mt.slot === "away",
        ).source,
        teamId: teamAwayId,
        team: null,
      },
    };
  }
  //Wich teams play this match

  //Find the teams by the id
  return {
    home: {
      source: null,
      teamId: teamHomeId,
      team: getTeamById(teams, teamHomeId),
    },
    away: {
      source: null,
      teamId: teamAwayId,
      team: getTeamById(teams, teamAwayId),
    },
  };
}

/**
 * Resolves a team from a tournament source identifier.
 *
 * Supported source formats include:
 * - "W101": winner of match 101.
 * - "1A": first-place team from group A..
 *
 * @param {string} source - Source identifier.
 * @param {Team[]} teams - Array containing all tournament teams.
 * @param {Standing[]} tableData - Current standings.
 * @param {Match[]} matches - All tournament matches.
 * @param {MatchTeam[]} matchTeams - Relationship between macth and participant teams.
 * @returns {Team|null} The resolved team, or null when theparticipant cannot yet be determined.
 */
export function getTeamBySource(source, teams, tableData, matches, matchTeams) {
  //Source W101 o W73
  if(source === 'third') return null;
  if (source.startsWith("W")) {
    let id = parseInt(source.slice(1));

    let match = matches.find((match) => match.id === id);
    if (!match) return null;
    let { homeScore, awayScore } = match;
    if (homeScore === null && awayScore === null) return null;
    if (homeScore > awayScore) {
      //home is the winner
      let teamID = matchTeams.find(
        (mt) => mt.matchId === id && mt.slot === "home",
      ).teamId;
      if (!teamID) return null;

      return teams.find((team) => team.id === teamID);
    } else {
      //away is the winner
      let teamID = matchTeams.find(
        (mt) => mt.matchId === id && mt.slot === "away",
      ).teamId;
      if (!teamID) return null;
      return teams.find((team) => team.id === teamID);
    }
  } else {
    //Source 1A, 2A o 3A
    let position = parseInt(source[0]);
    let groupCode = source.slice(1);
    //Find four teams from groups
    let groupTeams = teams.filter((team) => team.group === groupCode);
    //Order by standings
    let groupSorted = calculatePosition(groupTeams, tableData);
    //Get de index by the position
    let teamID = groupSorted[position - 1].id;

    return teams.find((t) => t.id === teamID);
  }
}

/**
 * Calculates the current ranking order of a group by its standings through
 * {@link sortTeams}.
 *
 * @param {Team[]} group - Teams belonging to one group.
 * @param {Standing[]} tableData - Current tournament standings.
 * @returns {Standing[]} The group standings ordered from first to last.
 */
export function calculatePosition(group, tableData) {
  let tableInfo = [];
  
  group.forEach((team) => {
    let tableTeam = tableData.find((teamTable) => teamTable.id === team.id);
    tableInfo.push(tableTeam);
  });

  tableInfo = sortTeams(tableInfo);

  return tableInfo;
}

/**
 * Sorts teams according to the tournament ranking criteria.
 *
 * Teams are ordered by:
 * 1. Points.
 * 2. Goal difference.
 * 3. Goals scored.
 * 4. Team name, alphabetically, as the final tie-breaker.
 *
 * @param {Standing[]} teams - Standings to sort.
 * @returns {Standing[]} A new sorted array.
 */
export function sortTeams(teams) {
  return teams.toSorted((a, b) => {
    if (a.ptos !== b.ptos) return b.ptos - a.ptos;
    if (a.dg !== b.dg) return b.dg - a.dg;
    if (a.gf !== b.gf) return b.gf - a.gf;
    return a.name.localeCompare(b.name);
  });
}
