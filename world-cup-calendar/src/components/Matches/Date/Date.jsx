import "./style.css";

function Date(props) {
  return (
    <>
      <div id="date">
        <p className="date">{props.date}</p>
        <p className="hour">{props.hour}</p>
      </div>
    </>
  );
}

export default Date