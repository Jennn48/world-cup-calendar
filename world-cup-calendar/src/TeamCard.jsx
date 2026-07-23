import { useState } from "react";

function TeamCard(props) {
  const [editing, setEditing] = useState(false);
  const [score, setScore] = useState(props.score ?? 0);

  function sendScore() {
    setEditing(false)
    props.addScore(score);
  }
  return (
    <>
      <div className="team">
        <img src={props.flagSrc} alt={`${props.name}-flag`} />
        <p>{props.name}</p>
        {editing ? (
          <input
            value={score}
            onChange={(e) => setScore(e.target.value)}
            type="number"
            min={0}
            style={{ width: "40px" }}
            className="score"
            onBlur={sendScore}
            autoFocus
          />
        ) : (
          <p className="score" onClick={() => setEditing(true)}>
            {score}
          </p>
        )}
      </div>
    </>
  );
}

export default TeamCard;
