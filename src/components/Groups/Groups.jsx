import Table from "./Table.jsx";
import "./style.css";

function Groups(props) {
  return (
    <>
      <section className="group">
        <div className="nav-bar">
          <h2>Fase de Grupos</h2>
        </div>
        {props.groups.map((g, index) => {
          return (
            <Table
              key={index}
              grupo={g.grupo}
              equipos={g.equipos}
              table ={props.table}
            />
          );
        })}
      </section>
    </>
  );
}
export default Groups;