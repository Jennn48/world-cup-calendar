 import { getMatchTeams, getTeamById } from "./auxiliaryFunctions.js";

 function getBracketData(matches, matchTeams, teams) {
    return matches.map((match) => {
      let teamSlots = getMatchTeams(match, matchTeams, teams);
      
      let homeTeam = getTeamById(teams, teamSlots.home.teamId);
      let awayTeam = getTeamById(teams, teamSlots.away.teamId);
      
      let flagLocal =homeTeam?.flagUrl ?? "/images/blank.webp";

      let flagAway = awayTeam?.flagUrl ?? "/images/blank.webp";
      
      return { match, homeTeam, awayTeam };
    });
  }

  export default getBracketData;