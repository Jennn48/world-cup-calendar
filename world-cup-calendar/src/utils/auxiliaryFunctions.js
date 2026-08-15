import matches from "../data/matches";

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
        teamId: matchTeams.find(mt => mt.matchId === match.id && mt.slot === "home").teamId,
      },
      away: {
        source: matchTeams.find(mt => mt.matchId === match.id && mt.slot === "away").source,
        teamId:matchTeams.find(mt => mt.matchId === match.id && mt.slot === "away").teamId,
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
export function getTeamBySource(source, teams, tableData, matches, matchTeams){
    //Source W101 o W73
    if (source.startsWith('W')){
      let id = parseInt(source.slice(1));
      
      let match = matches.find(match => match.id === id);
      if (!match) return null;
      let {homeScore, awayScore} = match;
      if (homeScore === null && awayScore === null) return null;
      if (homeScore > awayScore){
        //home is the winner
        let teamID = matchTeams.find(mt => mt.matchId === id && mt.slot === 'home').teamId;
        if(!teamID) return null;
        
        return teams.find(team => team.id === teamID);
      } else {
        //away is the winner
        let teamID = matchTeams.find(mt => mt.matchId === id && mt.slot === 'away').teamId;
        if(!teamID) return null;
        return teams.find(team => team.id === teamID);
      }
    }else {
      //Source 1A, 2A o 3A
      let position = parseInt(source[0]);
      let groupCode = source.slice(1);
      //Find four teams from groups
      let groupTeams = teams.filter(team => team.group === groupCode);
      //Order by standings
      let groupSorted = calculatePosition(groupTeams, tableData);
      //Get de index by the position
      let teamID = groupSorted[position - 1].id;
      
      return teams.find(t => t.id === teamID);
    }
}

export function calculatePosition(group, tableData) {
    let tableInfo = [];
    group.forEach((team) => {
      let tableTeam = tableData.find(
        (teamTable) => teamTable.name === team.name,
      );
      tableInfo.push(tableTeam);
    });

    //Ordenar
    tableInfo = sortTeams(tableInfo);

    return tableInfo;
  }

 export function sortTeams(teams) {
    teams.sort((a, b) => {
      if (a.ptos !== b.ptos) return b.ptos - a.ptos;
      if (a.dg !== b.dg) return b.dg - a.dg;
      if (a.gf !== b.gf) return b.gf - a.gf;
      return a.name.localeCompare(b.name);
    });
    return teams;
  }
