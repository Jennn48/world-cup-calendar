import MatchBracket from "./MatchBracket.jsx";
import "./style.css";

function Final(props) {
  let flagLocal =props.matches.homeTeam?.flagUrl ?? "images/blank.webp";

  let flagAway = props.matches.awayTeam?.flagUrl ?? "images/blank.webp";
  return (
    <>
      <div className="round final">
        <MatchBracket
          flagLocal={flagLocal}
              flagAway={flagAway}
              date={props.matches.match.matchDate}
        />
      </div>
    </>
  );
}

export default Final;
