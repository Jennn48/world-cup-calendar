import Table from "../Table/Table.jsx";
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

// {
//     grupo: "A",
//     equipos: [
//       { nombre: "Mexico", bandera: "https://flagsapi.com/MX/flat/64.png" },
//       { nombre: "Corea del Sur", bandera: "https://flagsapi.com/KR/flat/64.png" },
//       { nombre: "Sudafrica", bandera: "https://flagsapi.com/ZA/flat/64.png" },
//       { nombre: "Chequia", bandera: "https://flagsapi.com/CZ/flat/64.png" }
//     ]
//   }

export default Groups;