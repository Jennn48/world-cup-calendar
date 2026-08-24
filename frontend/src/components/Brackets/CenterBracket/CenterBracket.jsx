import  worldCup  from "/images/world-cup.png";
import Final from "./Final.jsx";
import "./style.css";
import "./responsive.css";

function CenterBracket(props) {
  return (
    <>
      <div className="center">
        <img className="cup" src={worldCup} alt="copa-del-mundo" />
        <p>FINAL</p>
        <Final matches={props.final}/>
      </div>
    </>
  );
}

export default CenterBracket;
