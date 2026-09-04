import "./style.css";
import { formatMatchDate, formatMatchTime } from "../../utils/formatDate.js";

function DateItem(props) {
  return (
    <>
      <div id="date">
        <p className="date">{formatMatchDate(props.date)}</p>
        <p className="hour">{formatMatchTime(props.date, props.time)}</p>
      </div>
    </>
  );
}

export default DateItem;