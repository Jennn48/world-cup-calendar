import "./style.css";
import { formatMatchDate} from "../../utils/formatDate.js";
function MatchBracket(props) {
  return (
    <>
      <div className="match">
        <p className="date">{formatMatchDate(props.date).split(",")[1]}</p>
        <img src={props.flagLocal} alt="Flag of the local team" />
        <img src={props.flagAway} alt="Flag of the away team" />
      </div>
    </>
  );
}

export default MatchBracket;