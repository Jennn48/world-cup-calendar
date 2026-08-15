export function getTeamById(teams, id) {
  return teams.find((team) => team.id === id);
}

export function getTeamsByGroup(teams, group) {
  return teams.filter((team) => team.group === group);
}

export function getMatchTeams(match, matchTeams, teams) {
    //If groupCode is null, diffrent stage
    if (match.groupCode === null) {
    return {
      home: {
        source: matchTeams.find(mt => mt.matchId === match.id && mt.slot === "home").source,
      },
      away: {
        source: matchTeams.find(mt => mt.matchId === match.id && mt.slot === "away").source,
      },
    };
  }
  //Wich teams play this match
  let matchTeamSlots = matchTeams.filter((mt) => mt.matchId === match.id);
  //Find the id of both teams
  let teamHomeId = matchTeamSlots.find((mts) => mts.slot === "home").teamId;
  let teamAwayId = matchTeamSlots.find((mts) => mts.slot === "away").teamId;

  //Find the teams by the id
  return {
    home: getTeamById(teams, teamHomeId),
    away: getTeamById(teams, teamAwayId),
  };
}

export default { getMatchTeams, getTeamById, getTeamsByGroup };
