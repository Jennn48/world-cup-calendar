import { useState } from "react";
import Table from "./Table.jsx";


function Groups(props) {
  const [groups, setGroups] = useState(props.grupos);

  return (
    <>
      <section className="group">
        <div className="nav-bar">
          <h2>Fase de Grupos</h2>
        </div>
        {groups.map((g, index) => {
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

{
  /* <div class="card-group">
        <table>
            <caption>Grupo A</caption>
          <tr>
            <th>Equipo</th>
            <th>PJ</th>
            <th>G</th>
            <th>E</th>
            <th>P</th>
            <th><span>Pts</span></th>
            <th>GF</th>
            <th>GC</th>
            <th>DG</th>
          </tr>
          <tr>
            <td class="team">
                <p class="num">1</p>
                <p class="flag"><img src="https://flagsapi.com/MX/flat/16.png"></p>
                <p class="name"><span>Mexico</span></p>
            </td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td><span>0</span></td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
        </table>
      </div> */
}
