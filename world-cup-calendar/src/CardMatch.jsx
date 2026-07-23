import TeamCard from "./TeamCard.jsx";
import Date from "./Date.jsx";
import groups from "./datos/grupos.js";
import { useState } from "react";

function CardMatch(props) {
  const [matchScore, setMatchScore] = useState({
    localScore: props.localScore,
    awayScore: props.awayScore,
  });

  function setLocalScore(score) {
    props.setMatches(prevMatches =>
    prevMatches.map(match =>
      match.local === props.localName && match.visitante === props.awayName
        ? { ...match, localScore: score }
        : match
    )
  );
  }

  function setAwayScore(score) {
    props.setMatches(prevMatches =>
    prevMatches.map(match =>
      match.local === props.localName && match.visitante === props.awayName
        ? { ...match, visitanteScore: score }
        : match
    )
  );
  }

  function findFlag(countryName) {
    let banderas = {};
    groups.forEach((group) => {
      group.equipos.forEach((equipo) => {
        banderas[equipo.nombre] = equipo.bandera;
      });
    });
    return banderas[countryName];
  }
  return (
    <>
      <div className="card-match">
        <p className="group-name">{props.group}</p>

        <div id="teams">
          <TeamCard
            className="local-team"
            name={props.localName}
            flagSrc={findFlag(props.localName)}
            score={matchScore.localScore}
            addScore={setLocalScore}
          />
          <TeamCard
            className="away-team"
            name={props.awayName}
            flagSrc={findFlag(props.awayName)}
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
