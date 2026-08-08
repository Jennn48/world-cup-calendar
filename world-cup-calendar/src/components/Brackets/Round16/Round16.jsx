import MatchBracket from "../MatchBracket/MatchBracket.jsx";
import "./style.css";
function Round16(props) {
  return (
    <>
      <div className="round r16">
        {props.matches.map((match) => (
          <MatchBracket
            flagLocal={match.flagLocal}
            flagAway={match.flagAway}
            date={match.date}
          />
        ))}
      </div>
    </>
  );
}

export default Round16;
