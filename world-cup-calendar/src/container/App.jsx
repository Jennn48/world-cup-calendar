import { useState, useEffect } from "react";
import { newMatches, newGroups, matchTeams, teams } from "../data";
import {
  getMatchTeams,
  getTeamById,
  getTeamsByGroup,
} from "../utils/auxiliaryFunctions.js";
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
  const [toggle, setToggle] = useState("groups");
  const [matches, setMatches] = useState(newMatches);
  const [matchesPlayOff, setMatchesPlayOff] = useState({});
  const [groups, setGroups] = useState(grupos);

  let tableData = calculateTable(newMatches, newGroups, teams, matchTeams);
  const classifiedGroups = newGroups.map((group) => {
    let equipos = getTeamsByGroup(teams, group.code);

    return {
      grupo: group.code,
      equipos: calculatePosition(equipos, tableData),
    };
  });

  const bracketData = {
    round16: getBracketData(matchesPlayOff.round16 ?? []),
    round8: getBracketData(matchesPlayOff.round8 ?? []),
    quarter: getBracketData(matchesPlayOff.quarter ?? []),
    semi: getBracketData(matchesPlayOff.semi ?? []),
    final: getBracketData(matchesPlayOff.final ?? []),
  };

  function getBracketData(matches) {
    
    return matches.map((match) => {
      let teamSlots = getMatchTeams(match, matchTeams, teams);
      //Aqui deberia calcular los partidos y devolver un team = {id: 25,name: "Belgica",flagUrl: "https://flagsapi.com/BE/flat/64.png",code: "BE",group: "G",}
      
      let flagLocal =teamSlots.home.flagUrl ?? "/blank.webp";

      let flagAway = teamSlots.away.flagUrl ?? "/blank.webp";
      
      return { flagLocal, flagAway, date: match.fecha };
    });
  }

  function calculateTable(matches, groups, teams, matchTeams) {
    const table = groups.flatMap((group) => {
      
      const groupTeams = getTeamsByGroup(teams, group.code);
      return groupTeams.map((team) => ({
        id: team.id,
        name: team.name,
        flag: team.flagUrl,
        pj: 0,
        gf: 0,
        gc: 0,
        dg: 0,
        p: 0,
        g: 0,
        e: 0,
        ptos: 0,
      }));
    });

    matches.forEach((match) => {
      const awayScore = match.awayScore;
      const homeScore = match.homeScore;
      const teamSlots = getMatchTeams(match, matchTeams, teams);

      
      let tableHome = table.find((team) => team.id === teamSlots.home.id);
      let tableAway = table.find((team) => team.id === teamSlots.away.id);

      //Matches played
      if (homeScore === null && awayScore === null) return;

      tableHome.pj++;
      tableAway.pj++;

      //Goals
      tableHome.gf += homeScore ?? 0;
      tableHome.gc += awayScore ?? 0;
      tableHome.dg = tableHome.gf - tableHome.gc;
      tableAway.gf += awayScore ?? 0;
      tableAway.gc += homeScore ?? 0;
      tableAway.dg = tableAway.gf - tableAway.gc;

      //Matches won, losed or points
      if (homeScore > awayScore) {
        tableHome.g += 1;
        tableHome.ptos += 3;
        tableAway.p += 1;
      } else if (homeScore < awayScore) {
        tableHome.p += 1;
        tableAway.g += 1;
        tableAway.ptos += 3;
      } else {
        tableHome.e += 1;
        tableHome.ptos += 1;
        tableAway.e += 1;
        tableAway.ptos += 1;
      }
    });    

    return table;
  }

  function calculatePosition(group, tableData) {
    let tableInfo = [];
    group.forEach((team) => {
      let tableTeam = tableData.find(
        (teamTable) => teamTable.name === team.name,
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
    const [nuevosMatches] = calculateRound16(
      tableData,
      newGroups,
      teams,
      "ROUND_OF_32",
    );

    setMatchesPlayOff((prevValues) => {
      return { ...prevValues, round16: nuevosMatches };
    });
  }, [matches]);

  //Cuando se modifique round16 se modifica round8
  useEffect(() => {
    if (matchesPlayOff.round16 == null) return;
    const [nuevosMatches] = calculateRound8(
      matchesPlayOff.round16,
      "Clasificación de 16",
      newGroups,
      teams
    );

    setMatchesPlayOff((prevValues) => {
      return { ...prevValues, round8: nuevosMatches };
    });
  }, [matchesPlayOff.round16]);

  useEffect(() => {
    if (matchesPlayOff.round8 == null) return;
    const [nuevosMatches] = calculateQuarter(
      matchesPlayOff.round8,
      "Cuartos de Final",
      newGroups,
      teams
    );

    setMatchesPlayOff((prevValues) => {
      return { ...prevValues, quarter: nuevosMatches };
    });
  }, [matchesPlayOff.round8]);

  useEffect(() => {
    if (matchesPlayOff.quarter == null) return;
    const [nuevosMatches] = calculateSemi(
      matchesPlayOff.quarter,
      "Semifinal",
      newGroups,
      teams
    );

    setMatchesPlayOff((prevValues) => {
      return { ...prevValues, semi: nuevosMatches };
    });
  }, [matchesPlayOff.quarter]);

  useEffect(() => {
    if (matchesPlayOff.semi == null) return;
    const [nuevosMatches] = calculateFinal(
      matchesPlayOff.semi,
      "Final",
      newGroups,
      teams
    );

    setMatchesPlayOff((prevValues) => {
      return { ...prevValues, final: nuevosMatches };
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
        <Keys matches={bracketData} realMatches={matchesPlayOff} />
      )}
    </>
  );
}

export default App;
