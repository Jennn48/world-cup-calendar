import "./style.css";

function Header() {
  return (
    <>
      <header>
        <ul className="nav-bar nav">
          <li>
            <a href="/index.html">Grupos</a>
          </li>
          <li>
            <a href="/matches.html">Partidos</a>
          </li>
        </ul>
      </header>
    </>
  );
}

export default Header;
