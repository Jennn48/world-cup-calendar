import MatchBracket from "./MatchBracket.jsx";

function Final(props) {
  return (
    <>
      <div className="final">
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

export default Final;