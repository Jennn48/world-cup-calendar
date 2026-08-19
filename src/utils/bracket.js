 import { getMatchTeams, getTeamById } from "./auxiliaryFunctions.js";

 /**
  * Builds the data structure required to render the knockout bracket.
  * 
  * @param {Matches[]} matches -  Matches belonging to a knockout round.
  * @param {MatchTeams[]} matchTeams - Relationship between macth and participant teams.
  * @param {Teams[]} teams - Array containing all tournament teams.
  * @returns {BracketMatch[]} Each match combined with its currently 
  * resolved home and away teams.
  */
 function getBracketData(matches, matchTeams, teams) {
    return matches.map((match) => {
      let teamSlots = getMatchTeams(match, matchTeams, teams);
      
      let homeTeam = getTeamById(teams, teamSlots.home.teamId);
      let awayTeam = getTeamById(teams, teamSlots.away.teamId);
      
      return { match, homeTeam, awayTeam };
    });
  }

  export default getBracketData;