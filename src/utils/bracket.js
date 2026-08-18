 import { getMatchTeams, getTeamById } from "./auxiliaryFunctions.js";

 function getBracketData(matches, matchTeams, teams) {
    return matches.map((match) => {
      let teamSlots = getMatchTeams(match, matchTeams, teams);
      
      let homeTeam = getTeamById(teams, teamSlots.home.teamId);
      let awayTeam = getTeamById(teams, teamSlots.away.teamId);
      
      return { match, homeTeam, awayTeam };
    });
  }

  export default getBracketData;