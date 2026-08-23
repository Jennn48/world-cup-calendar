import LeftBracket from "./LeftBracket.jsx";
import CenterBracket from "./CenterBracket.jsx";
import RightBracket from "./RightBracket.jsx";
import "./style.css";


function Keys(props) {  
  
  return (
    <>
      <section className="keys">
        <div className="title">
          <h2>Esquema de Llaves</h2>
        </div>

        <div className="bracket">
          <LeftBracket r16={props.matches.round16.slice(0,8)} r8={props.matches.round8.slice(0,4)} quarter={props.matches.quarter.slice(0,2)} semi={props.matches.semi.slice(0,1)} />
          <CenterBracket final={props.matches.final[0]}/>
          <RightBracket r16={props.matches.round16.slice(8)} r8={props.matches.round8.slice(4)} quarter={props.matches.quarter.slice(2)} semi={props.matches.semi.slice(1)}/>
        </div>
      </section>
    </>
  );
}

export default Keys;
