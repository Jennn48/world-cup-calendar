import MatchBracket from "./MatchBracket.jsx";

function Round8(props) {
  return (
    <>
      <div className="round r8">
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

export default Round8;
