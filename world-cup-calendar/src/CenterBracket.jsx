import  worldCup  from "./assets/world-cup.png";

function CenterBracket(props) {
  return (
    <>
      <div className="center">
        <img className="cup" src={worldCup} alt="copa-del-mundo" />
        <p>FINAL</p>
      </div>
    </>
  );
}

export default CenterBracket;
