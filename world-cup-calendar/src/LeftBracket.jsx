import Round16 from "./Round16.jsx";
import Round8 from "./Round8.jsx";
import Quarter from "./Quarter.jsx";


function LeftBracket(props) {
  return (
    <>
      <div className="side left">
        <Round16 matches={props.r16} />
        <Round8 matches={props.r8} />
        <Quarter matches={props.quarter} />

      </div>
    </>
  );
}

export default LeftBracket;
