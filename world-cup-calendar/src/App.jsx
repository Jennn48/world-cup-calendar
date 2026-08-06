import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header.jsx";
import Hero from "./Hero.jsx";
import Groups from "./Groups.jsx";
import Matches from "./Matches.jsx";
import Keys from "./Keys.jsx";
import Toggle from "./Toggle.jsx";
import matchesData from "./datos/matches.js";
import table from "./datos/tabla.js";
import grupos from "./datos/grupos.js";
import { calculateRound16, calculateRound8 } from "./datos/classificationFc.js";
import Round16 from "./Round16.jsx";

function App() {
  const [playOffMatches, setPlayOffMatches] = useState({});
  const [toggle, setToggle] = useState("groups");
  const [matches, setMatches] = useState(matchesData);
  const [matchesPlayOff, setMatchesPlayOff] = useState({
    round16: [],
    round8: [],
  });
  const [groups, setGroups] = useState(grupos);

  const tableData = calculateTable(matches);
  {
    groups.forEach(({ equipos }) => {
      calculatePosition(equipos);
    });
  }

  function calculateTable(matches) {
    //Reinicio marcadores
    table.forEach((team) => {
      team.pj = 0;
      team.gf = 0;
      team.gc = 0;
      team.dg = 0;
      team.p = 0;
      team.g = 0;
      team.e = 0;
      team.ptos = 0;
    });
    matches.forEach((match) => {
      const { visitante, local, visitanteScore, localScore } = match;
      let tableLocal = table.find((team) => team.name === local);
      let tableAway = table.find((team) => team.name === visitante);

      //Partidos jugados
      if (match.localScore === null && match.visitanteScore === null) return;
      else {
        tableLocal.pj++;
        tableAway.pj++;

        //Goles
        tableLocal.gf += parseInt(localScore === null ? 0 : localScore);
        tableLocal.gc += parseInt(visitanteScore === null ? 0 : visitanteScore);
        tableLocal.dg = tableLocal.gf - tableLocal.gc;
        tableAway.gf += parseInt(visitanteScore === null ? 0 : visitanteScore);
        tableAway.gc += parseInt(localScore === null ? 0 : localScore);
        tableAway.dg = tableAway.gf - tableAway.gc;

        //Partidos ganados o perdidos y puntos
        if (localScore > visitanteScore) {
          tableLocal.g += 1;
          tableLocal.ptos += 3;
          tableAway.p += 1;
        } else if (localScore < visitanteScore) {
          tableLocal.p += 1;
          tableAway.g += 1;
          tableAway.ptos += 3;
        } else {
          tableLocal.e += 1;
          tableLocal.ptos += 1;
          tableAway.e += 1;
          tableAway.ptos += 1;
        }
      }
    });
    return table;
  }

  function calculatePosition(group) {
    let tableInfo = [];
    group.forEach((team) => {
      let tableTeam = tableData.find(
        (teamTable) => teamTable.name === team.nombre,
      );
      tableInfo.push(tableTeam);
    });

    //Ordenar
    tableInfo = sortTeams(tableInfo);

    //Modificar position
    tableInfo.forEach((item, index) => {
      item.position = index + 1;
    });
    return tableInfo;
  }

  function sortTeams(teams) {
    teams.sort((a, b) => {
      if (a.ptos !== b.ptos) return b.ptos - a.ptos;
      if (a.dg !== b.dg) return b.dg - a.dg;
      if (a.gf !== b.gf) return b.gf - a.gf;
      return a.name.localeCompare(b.name);
    });
    return teams;
  }

  function togglePosition(position) {
    setToggle(position);
  }

  //Cruces
  useEffect(() => {
    const [nuevosMatches, nuevosCruces] = calculateRound16(
      tableData,
      groups,
      "Clasificación de 32",
    );

    setMatchesPlayOff((prevValues) => {
      return { ...prevValues, round16: nuevosMatches };
    });

    setPlayOffMatches((prevValues) => {
      return { ...prevValues, ...nuevosCruces };
    });
  }, [matches]);

  //Cuando se modifique round16 se modifica round8
  useEffect(() => {
    const [nuevosMatches, nuevosCruces] = calculateRound8(
      matchesPlayOff.round16,
      "Clasificación de 16",
    );

    setMatchesPlayOff((prevValues) => {
      return { ...prevValues, round8: nuevosMatches };
    });

    setPlayOffMatches((prevValues) => {
      return { ...prevValues, ...nuevosCruces };
    });
  }, [matchesPlayOff.round16]);

  return (
    <>
      <Header />
      <Hero />

      <Toggle onToggle={togglePosition} />
      {toggle === "groups" ? (
        <Groups table={tableData} grupos={groups} />
      ) : toggle === "matches" ? (
        <Matches
          matchesPlayOff={matchesPlayOff}
          setMatchesPlayOff={setMatchesPlayOff}
          matches={matches}
          setMatches={setMatches}
        />
      ) : (
        <Keys matches={playOffMatches} />
      )}
    </>
  );
}

export default App;
