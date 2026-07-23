import { useState } from "react";

function Toggle(props) {
  const [position, setPosition] = useState("0");

  function handleClick(e) {
    if (e.target.id === "groups") {
      setPosition("0");
    } else if (e.target.id === "matches") {
      setPosition("100%");
    } else if (e.target.id === "keys") {
      setPosition("200%");
    }

    props.onToggle(e.target.id);
  }

  return (
    <>
      <section className="toggle-div">
        <div className="toggle">
          <button onClick={handleClick} id="groups">
            Grupos
          </button>
          <button onClick={handleClick} id="matches">
            Partidos
          </button>
          <button onClick={handleClick} id="keys">
            LLaves
          </button>

          <div
            className="thumb"
            style={{ transform: `translateX(${position})` }}
          ></div>
        </div>
      </section>
    </>
  );
}

export default Toggle;
