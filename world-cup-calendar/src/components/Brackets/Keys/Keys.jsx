import LeftBracket from "../LeftBracket/LeftBracket.jsx";
import CenterBracket from "../CenterBracket/CenterBracket.jsx";
import RightBracket from "../RightBracket/RightBracket.jsx";
import "./style.css";


function Keys(props) {
  return (
    <>
      <section className="keys">
        <div className="title">
          <h2>Esquema de Llaves</h2>
        </div>

        <div className="bracket">
          <LeftBracket r16={props.matches.r16Left} r8={props.matches.r8Left} quarter={props.matches.quarterLeft} semi={props.matches.semiLeft} />
          <CenterBracket final={props.matches.final}/>
          <RightBracket r16={props.matches.r16Right} r8={props.matches.r8Right} quarter={props.matches.quarterRight} semi={props.matches.semiRight}/>
        </div>
      </section>
    </>
  );
}

export default Keys;
