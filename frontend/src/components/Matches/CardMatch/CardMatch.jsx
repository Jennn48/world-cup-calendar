import TeamCard from "./TeamCard.jsx";
import Date from "./Date.jsx";
import "./style.css";

function CardMatch(props) {

  /**
   * Send a score to the parent component.
   * @param {number} score - Home-team score
   */
  function setHomeScore(score) {
    props.updateMatchScore(props.match.id, "home", score);
  }

  /**
   * Send a score to the parent component.
   *  * @param {number} score - Away-team score
   */
  function setAwayScore(score) {
    props.updateMatchScore(props.match.id, "away", score);
  }
  
  
  return (
    <>
      <div className="card-match">
        <p className="group-name">{props.match.groupCode && `Grupo ${props.match.groupCode}`}</p>

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

        <Date date={props.match.matchDate} time={props.match.matchTime} />
      </div>
    </>
  );
}

export default CardMatch;
