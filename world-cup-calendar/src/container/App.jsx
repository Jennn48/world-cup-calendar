import { useState, useEffect } from "react";
import { matchesData, groups, matchTeams, teams} from "../data";
import {
  getMatchTeams,
  getTeamById,
  getTeamsByGroup,
  getTeamBySource,
  calculatePosition
} from "../utils/auxiliaryFunctions.js";
import calculateStandings from "../utils/standings.js";
import getBracketData from "../utils/bracket.js";
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
  calculateRound16,
  calculateRound8,
  calculateQuarter,
  calculateSemi,
  calculateFinal,
} from "../utils/index.js";

function App() {
  const [toggle, setToggle] = useState("groups");
  const [matches, setMatches] = useState(matchesData);

  let standings = calculateStandings(matches.filter(m => m.round === "GROUP_STAGE"), groups, teams, matchTeams);
  
  const classifiedGroups = groups.map((group) => {
    let equipos = getTeamsByGroup(teams, group.code);

    return {
      grupo: group.code,
      equipos: calculatePosition(equipos, standings),
    };
  });

  const bracketData = {
    round16: getBracketData(matches.filter(m => m.round === "ROUND_OF_32") ?? [], matchTeams, teams),
    round8: getBracketData(matches.filter(m => m.round === "ROUND_OF_16") ?? [], matchTeams, teams),
    quarter: getBracketData(matches.filter(m => m.round === "QUARTERFINAL") ?? [], matchTeams, teams),
    semi: getBracketData(matches.filter(m => m.round === "SEMIFINAL") ?? [], matchTeams, teams),
    final: getBracketData(matches.filter(m => m.round === "FINAL") ?? [], matchTeams, teams),
  };

 


  function togglePosition(position) {
    setToggle(position);
  }

  //Cruces
  useEffect(() => {
  calculateRound16(
      standings,
      groups,
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
        <Groups table={standings} groups={classifiedGroups} />
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
