import MatchBracket from "../MatchBracket/MatchBracket.jsx";
import "./style.css";

function Final(props) {
  return (
    <>
      <div className="round final">
          <MatchBracket
            flagLocal={props.matches.flagLocal}
            flagAway={props.matches.flagAway}
            date={props.matches.date}
          />
      </div>
    </>
  );
}

export default Final;