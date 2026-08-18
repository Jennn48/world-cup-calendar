import "./style.css";
function MatchBracket(props) {
  return (
    <>
      <div className="match">
        <p className="date">{props.date}</p>
        <img src={props.flagLocal} alt="-flag" />
        <img src={props.flagAway} alt="-flag" />
      </div>
    </>
  );
}

export default MatchBracket;