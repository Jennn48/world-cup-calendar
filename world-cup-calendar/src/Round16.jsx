import MatchBracket from "./MatchBracket.jsx";

function Round16(props) {
    const r16 = [
    { flagLocal: "/blank.webp", flagAway: "/blank.webp", date: "29/6" },
    { flagLocal: "/blank.webp", flagAway: "/blank.webp", date: "30/6" },
    { flagLocal: "/blank.webp", flagAway: "/blank.webp", date: "28/6" },
    { flagLocal: "/blank.webp", flagAway: "/blank.webp", date: "29/6" },
    { flagLocal: "/blank.webp", flagAway: "/blank.webp", date: "2/7" },
    { flagLocal: "/blank.webp", flagAway: "/blank.webp", date: "2/7" },
    { flagLocal: "/blank.webp", flagAway: "/blank.webp", date: "1/7" },
    { flagLocal: "/blank.webp", flagAway: "/blank.webp", date: "1/7" },
  ];
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
