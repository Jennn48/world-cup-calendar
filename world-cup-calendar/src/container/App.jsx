import { useState, useEffect } from "react";
import { newMatches, newGroups, matchTeams, teams} from "../data";
import {
  getMatchTeams,
  getTeamById,
  getTeamsByGroup,
  getTeamBySource,
  calculatePosition
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
  const [groups, setGroups] = useState(grupos);

  let tableData = calculateTable(matches.filter(m => m.round === "GROUP_STAGE"), newGroups, teams, matchTeams);
  
  const classifiedGroups = newGroups.map((group) => {
    let equipos = getTeamsByGroup(teams, group.code);

    return {
      grupo: group.code,
      equipos: calculatePosition(equipos, tableData),
    };
  });

  const bracketData = {
    round16: getBracketData(matches.filter(m => m.round === "ROUND_OF_32") ?? []),
    round8: getBracketData(matches.filter(m => m.round === "ROUND_OF_16") ?? []),
    quarter: getBracketData(matches.filter(m => m.round === "QUARTERFINAL") ?? []),
    semi: getBracketData(matches.filter(m => m.round === "SEMIFINAL") ?? []),
    final: getBracketData(matches.filter(m => m.round === "FINAL") ?? []),
  };

  function getBracketData(matches) {
    
    
    return matches.map((match) => {
      let teamSlots = getMatchTeams(match, matchTeams, teams);
      
      let home = getTeamById(teams, teamSlots.home.teamId);
      let away = getTeamById(teams, teamSlots.away.teamId);
      
      let flagLocal =home?.flagUrl ?? "/images/blank.webp";

      let flagAway = away?.flagUrl ?? "/images/blank.webp";
      
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


  function togglePosition(position) {
    setToggle(position);
  }

  //Cruces
  useEffect(() => {
  calculateRound16(
      tableData,
      newGroups,
      teams,
      "ROUND_OF_32",
      matches, 
      matchTeams
    );
    
    
  }, [matches]);

  function updateMatchScore(matchId, slot, score){
    setMatches(prevMatches => {
      return prevMatches.map(match => match.id ===matchId ? {
        ...match,
        [`${slot}Score`] : score,
      } : match);
    });
  }

  return (
    <>
      <Header />
      <Hero />

      <Toggle onToggle={togglePosition} />
      {toggle === "groups" ? (
        <Groups table={tableData} groups={classifiedGroups} />
      ) : toggle === "matches" ? (
        <Matches
          matches={matches}
          updateMatchScore={updateMatchScore}
        />
      ) : (
        <Keys matches={bracketData} />
      )}
    </>
  );
}

export default App;
