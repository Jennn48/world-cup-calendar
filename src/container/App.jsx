import { useState} from "react";
import { matchesData, groups, matchTeams, teams } from "../data";
import {
  getTeamsByGroup,
  calculatePosition,
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
import resolveMatchTeams from "../utils/classificationFc.js";

function App() {
  const [toggle, setToggle] = useState("groups");
  const [matches, setMatches] = useState(matchesData);

    let standings = calculateStandings(
    matches.filter((m) => m.round === "GROUP_STAGE"),
    groups,
    teams,
    matchTeams,
  );

  const resolvedMatchTeams = resolveMatchTeams(
    standings,
    groups,
    teams,
    "ROUND_OF_32",
    matches,
    matchTeams,
  );

  const classifiedGroups = groups.map((group) => ({
    grupo: group.code,
    equipos: calculatePosition(getTeamsByGroup(teams, group.code), standings),
  }));

  const bracketData = {
    round16: getBracketData(
      matches.filter((m) => m.round === "ROUND_OF_32") ?? [],
      resolvedMatchTeams,
      teams,
    ),
    round8: getBracketData(
      matches.filter((m) => m.round === "ROUND_OF_16") ?? [],
      resolvedMatchTeams,
      teams,
    ),
    quarter: getBracketData(
      matches.filter((m) => m.round === "QUARTERFINAL") ?? [],
      resolvedMatchTeams,
      teams,
    ),
    semi: getBracketData(
      matches.filter((m) => m.round === "SEMIFINAL") ?? [],
      resolvedMatchTeams,
      teams,
    ),
    final: getBracketData(
      matches.filter((m) => m.round === "FINAL") ?? [],
      resolvedMatchTeams,
      teams,
    ),
  };
  

  function togglePosition(position) {
    setToggle(position);
  }

  function updateMatchScore(matchId, slot, score) {
    setMatches((prevMatches) => {
      return prevMatches.map((match) =>
        match.id === matchId
          ? {
              ...match,
              [`${slot}Score`]: score,
            }
          : match,
      );
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
        <Matches matches={matches} updateMatchScore={updateMatchScore} teams={teams} matchTeams={resolvedMatchTeams}/>
      ) : (
        <Keys matches={bracketData} />
      )}
    </>
  );
}

export default App;
