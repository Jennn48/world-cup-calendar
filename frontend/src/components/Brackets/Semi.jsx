import MatchBracket from "./MatchBracket.jsx";
import "./style.css";
function Semi(props) {
  return (
    <>
      <div className="round semi">
        {props.matches.map((match) => {
          let flagLocal = match.homeTeam?.flagUrl ?? "images/blank.webp";

          let flagAway = match.awayTeam?.flagUrl ?? "images/blank.webp";
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

export default Semi;