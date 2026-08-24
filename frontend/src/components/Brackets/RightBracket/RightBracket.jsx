import Round16 from "./Round16.jsx";
import Round8 from "./Round8.jsx";
import Quarter from "./Quarter.jsx";
import Semi from "./Semi.jsx";
import "./style.css";

function RightBracket(props) {
  return (
    <>
      <div className="side right">
        <Semi matches={props.semi} />
        <Quarter matches={props.quarter} />
        <Round8 matches={props.r8} />
        <Round16 matches={props.r16} />
      </div>
    </>
  );
}

export default RightBracket;
