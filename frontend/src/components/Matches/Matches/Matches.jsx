import MatchItem from "./MatchItem.jsx";
import "./style.css";
import "./responsive.css";

function Matches(props) {
  const ROUND_CONFIG = [
    {
      round: "GROUP_STAGE",
      title: "Partidos fase de grupos",
    },
    {
      round: "ROUND_OF_32",
      title: "Partidos dieciseisavos de final",
    },
    {
      round: "ROUND_OF_16",
      title: "Partidos octavos de final",
    },
    {
      round: "QUARTERFINAL",
      title: "Partidos cuartos de final",
    },
    {
      round: "SEMIFINAL",
      title: "Partidos semifinal",
    },
    {
      round: "FINAL",
      title: "Partido final",
    },
  ];
  return (
    <>
      <section className="matches">
        {ROUND_CONFIG.map(({ round, title }, index) => {
          const roundMatches = props.matches.filter(
            (match) => match.round === round,
          );
          
          if (roundMatches.length === 0) {
            return null;
          }

          return (
              <MatchItem
                key={round}
                id={index + 1}
                matches={roundMatches}
                title={title}
                matchTeams={props.matchTeams}
                teams={props.teams}
                updateMatchScore={props.updateMatchScore}
              />
          );
        })}
      </section>
    </>
  );
}
export default Matches;
