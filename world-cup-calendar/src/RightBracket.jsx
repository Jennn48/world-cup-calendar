import Round16 from "./Round16.jsx";
import Round8 from "./Round8.jsx";

function RightBracket(props) {
  return (
    <>
      <div className="side right">
        
        
        <Round8 matches={props.r8} />
        <Round16 matches={props.r16} />
      </div>
    </>
  );
}

export default RightBracket;
