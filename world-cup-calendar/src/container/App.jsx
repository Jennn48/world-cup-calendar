import { useState, useEffect } from "react";
import "./App.css";
import {
  Keys,
  Groups,
  Matches,
  Header,
  Hero,
  Toggle,
} from "../components/index.js";
import {
  matchesData,
  grupos,
  calculateRound16,
  calculateRound8,
  calculateQuarter,
  calculateSemi,
  calculateFinal,
} from "../utils/index.js";

function App() {
  const [playOffMatches, setPlayOffMatches] = useState({});
  const [toggle, setToggle] = useState("groups");
  const [matches, setMatches] = useState(matchesData);
  const [matchesPlayOff, setMatchesPlayOff] = useState({});
  const [groups, setGroups] = useState(grupos);

  const tableData = calculateTable(matches);
  const classifiedGroups = groups.map((group) => ({
  ...group,
  equipos: calculatePosition(group.equipos, tableData),
}));

  function calculateTable(matches) {
    //Creo la variable table
    const table = groups.flatMap(({ equipos }) =>
      equipos.map((team) => ({
        name: team.nombre,
        flag: team.bandera,
        pj: 0,
        gf: 0,
        gc: 0,
        dg: 0,
        p: 0,
        g: 0,
        e: 0,
        ptos: 0,
      })),
    );

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
    if (matchesPlayOff.round16 == null) return;
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

  useEffect(() => {
    if (matchesPlayOff.round8 == null) return;
    const [nuevosMatches, nuevosCruces] = calculateQuarter(
      matchesPlayOff.round8,
      "Cuartos de Final",
    );

    setMatchesPlayOff((prevValues) => {
      return { ...prevValues, quarter: nuevosMatches };
    });

    setPlayOffMatches((prevValues) => {
      return { ...prevValues, ...nuevosCruces };
    });
  }, [matchesPlayOff.round8]);

  useEffect(() => {
    if (matchesPlayOff.quarter == null) return;
    const [nuevosMatches, nuevosCruces] = calculateSemi(
      matchesPlayOff.quarter,
      "Semifinal",
    );

    setMatchesPlayOff((prevValues) => {
      return { ...prevValues, semi: nuevosMatches };
    });

    setPlayOffMatches((prevValues) => {
      return { ...prevValues, ...nuevosCruces };
    });
  }, [matchesPlayOff.quarter]);

  useEffect(() => {
    if (matchesPlayOff.semi == null) return;
    const [nuevosMatches, nuevosCruces] = calculateFinal(
      matchesPlayOff.semi,
      "Final",
    );

    setMatchesPlayOff((prevValues) => {
      return { ...prevValues, final: nuevosMatches };
    });

    setPlayOffMatches((prevValues) => {
      return { ...prevValues, ...nuevosCruces };
    });
  }, [matchesPlayOff.semi]);

  return (
    <>
      <Header />
      <Hero />

      <Toggle onToggle={togglePosition} />
      {toggle === "groups" ? (
        <Groups table={tableData} groups={classifiedGroups} />
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
