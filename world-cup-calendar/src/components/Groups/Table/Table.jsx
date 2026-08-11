import { useState } from "react";

import Team from "../Team/Team.jsx";
import "./style.css";

function Table(props) {
  // name: "Mexico", id: 1, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0    
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
            {props.equipos.map((team, index) => {
              return (
                <Team
                  key={team.id}
                  name={team.name}
                  flag={team.flag}
                  position={index + 1}
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
