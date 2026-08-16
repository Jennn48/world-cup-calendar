import TeamCard from "../TeamCard/TeamCard.jsx";
import Date from "../Date/Date.jsx";
import { useState } from "react";
import "./style.css";

function CardMatch(props) {
  const [matchScore, setMatchScore] = useState({
    localScore: props.localScore,
    awayScore: props.awayScore,
  });

  function setHomeScore(score) {
    props.updateMatchScore(props.id, "home", score);
  }

  function setAwayScore(score) {
    props.updateMatchScore(props.id, "away", score);
  }

  
  return (
    <>
      <div className="card-match">
        <p className="group-name">{props.group}</p>

        <div id="teams">
          <TeamCard
            className="local-team"
            name={props.localName}
            flagSrc={props.homeFlag}
            score={matchScore.localScore}
            addScore={setHomeScore}
          />
          <TeamCard
            className="away-team"
            name={props.awayName}
            flagSrc={props.awayFlag}
            score={matchScore.awayScore}
            addScore={setAwayScore}
          />
        </div>

        <Date date={props.date} hour={props.hour} />
      </div>
    </>
  );
}

export default CardMatch;
