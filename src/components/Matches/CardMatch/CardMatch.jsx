import TeamCard from "../TeamCard/TeamCard.jsx";
import Date from "../Date/Date.jsx";
import "./style.css";

function CardMatch(props) {

  function setHomeScore(score) {
    props.updateMatchScore(props.match.id, "home", score);
  }

  function setAwayScore(score) {
    props.updateMatchScore(props.match.id, "away", score);
  }
  
  
  return (
    <>
      <div className="card-match">
        <p className="group-name">{props.match.groupCode}</p>

        <div id="teams">
          <TeamCard
            className="local-team"
            name={props.homeTeam.name}
            flagSrc={props.homeTeam.flagUrl}
            score={props.match.homeScore}
            addScore={setHomeScore}
          />
          <TeamCard
            className="away-team"
            name={props.awayTeam.name}
            flagSrc={props.awayTeam.flagUrl}
            score={props.match.awayScore}
            addScore={setAwayScore}
          />
        </div>

        <Date date={props.match.matchDate} hour={props.match.matchTime} />
      </div>
    </>
  );
}

export default CardMatch;
