import { useState } from "react";

import Team from "./Team.jsx";

function Table(props) {
  const [tableData, setTableData] = useState(props.table);
  // name: "Mexico", id: 1, position: 1, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0
  const equiposOrdenados = props.equipos
    .map((team) => {
      const datosTabla = tableData.find((td) => td.name === team.nombre);

      return {
        ...team, // nombre, bandera...
        ...datosTabla, // pj, ptos, dg, position...
      };
    })
    .sort((a, b) => a.position - b.position);
  return (
    <>
      <div className="card-group">
        <table>
          <caption>Grupo {props.grupo}</caption>
          <thead>
            <tr>
              <th>Equipo</th>
              <th>PJ</th>
              <th>G</th>
              <th>E</th>
              <th>P</th>
              <th>
                <span>Pts</span>
              </th>
              <th>GF</th>
              <th>GC</th>
              <th>DG</th>
            </tr>
          </thead>
          <tbody>
            {equiposOrdenados.map((team) => {
              return (
                <Team
                  key={team.id}
                  name={team.nombre}
                  flag={team.bandera}
                  position={team.position}
                  pj={team.pj}
                  g={team.g}
                  e={team.e}
                  p={team.p}
                  ptos={team.ptos}
                  gf={team.gf}
                  gc={team.gc}
                  dg={team.dg}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
