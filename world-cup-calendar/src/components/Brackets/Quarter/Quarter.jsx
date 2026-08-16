import MatchBracket from "../MatchBracket/MatchBracket.jsx";
import "./style.css";

function Quarter(props) {
  return (
    <>
      <div className="round quarter">
        {props.matches.map((match) => {
          let flagLocal = match.homeTeam?.flagUrl ?? "/images/blank.webp";

          let flagAway = match.awayTeam?.flagUrl ?? "/images/blank.webp";
          return (
            <MatchBracket
              flagLocal={flagLocal}
              flagAway={flagAway}
              date={match.match.matchDate}
            />
          );
        })}
      </div>
    </>
  );
}

export default Quarter;