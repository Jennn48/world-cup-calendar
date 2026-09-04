import "./style.css";
import { formatMatchDate} from "../../utils/formatDate.js";
function MatchBracket(props) {
  return (
    <>
      <div className="match">
        <p className="date">{formatMatchDate(props.date).split(",")[1]}</p>
        <img src={props.flagLocal} alt="-flag" />
        <img src={props.flagAway} alt="-flag" />
      </div>
    </>
  );
}

export default MatchBracket;