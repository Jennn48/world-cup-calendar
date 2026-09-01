import copaMundial from "/images/copaMundial.png";
import "./style.css";
import "./responsive.css";

function Hero(props) {
  async function handleReset() {
    try {
      await props.reset();

      // update react data
      props.updateReact();
    } catch (error) {
      console.error(error);
    }
  }
  async function handleSet() {
    try {
      await props.set();

      // update react data
      props.updateReact();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <section className="hero">
        <div className="hero-container">
          <h1>Copa Mundial de la FIFA 2026</h1>
          <div className="button-container">
            <button className="reset-button" onClick={handleReset}>
              Reset
            </button>
            <button className="set-button" onClick={handleSet}>
              View Real Scores
            </button>
          </div>
        </div>
        <img src={copaMundial} alt="copa del mundo" width="400px" />
      </section>
    </>
  );
}

export default Hero;
