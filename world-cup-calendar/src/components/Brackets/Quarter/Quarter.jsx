import MatchBracket from "../MatchBracket/MatchBracket.jsx";
import "./style.css";

function Quarter(props) {
  return (
    <>
      <div className="round quarter">
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

export default Quarter;