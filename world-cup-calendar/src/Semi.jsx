import MatchBracket from "./MatchBracket.jsx";

function Semi(props) {
  return (
    <>
      <div className="round semi">
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

export default Semi;