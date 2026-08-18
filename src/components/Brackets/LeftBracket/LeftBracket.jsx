import Round16 from "../Round16/Round16.jsx";
import Round8 from "../Round8/Round8.jsx";
import Quarter from "../Quarter/Quarter.jsx";
import Semi from "../Semi/Semi.jsx";
import "./style.css";


function LeftBracket(props) {
  return (
    <>
      <div className="side left">
        <Round16 matches={props.r16} />
        <Round8 matches={props.r8} />
        <Quarter matches={props.quarter} />
        <Semi matches={props.semi} />
      </div>
    </>
  );
}

export default LeftBracket;
