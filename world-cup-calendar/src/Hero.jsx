import copaMundial from '/images/copaMundial.png'

function Hero() {
  return (
    <>
      <section className="hero">
        <h1>Copa Mundial de la FIFA 2026</h1>
        <img src={copaMundial} alt="copa del mundo" width="400px" />
      </section>
    </>
  );
}

export default Hero;
