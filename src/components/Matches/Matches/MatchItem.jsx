import CardMatch from "../CardMatch/CardMatch.jsx";
import {
  getMatchTeams,
  getTeamById,
} from "../../../utils/auxiliaryFunctions.js";

function MatchItem(props) {
    let readyMatches = props.matches.map((match) => {
        let teamSlots = getMatchTeams(match, props.matchTeams, props.teams);

        const homeTeam = getTeamById(props.teams, teamSlots.home.teamId);

        const awayTeam = getTeamById(props.teams, teamSlots.away.teamId);

        if (homeTeam && awayTeam) {
          return {match, homeTeam, awayTeam};
        }
      }).filter(Boolean);

      if(!readyMatches.length) return null;
      
  return (
    <>
      <div className="title">
        <h2>{props.title}</h2>
      </div>
      {readyMatches.map(({match, homeTeam, awayTeam}) => {

        return (
          <CardMatch
            key={match.id}
            id={match.id}
            match={match}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            updateMatchScore={props.updateMatchScore}
          />
        );
      })}
    </>
  );
}

export default MatchItem;
