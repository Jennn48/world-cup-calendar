import { useState, useEffect } from "react";
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

import { getGroups, getMatches, getTeams, getMatchTeams } from "../api/index.js";

function App() {
  const [toggle, setToggle] = useState("groups");
  const [matches, setMatches] = useState([]);
  const [groups, setGroups] = useState([]);
  const [teams, setTeams] = useState([]);
  const [matchTeams, setMatchTeams] = useState([]);

  useEffect(() => {
    (async function () {
      const groupData = await getGroups();
      const matchData = await getMatches();
      const teamData = await getTeams();
      const matchTeamsData = await getMatchTeams();

      setGroups(groupData);
      setMatches(matchData);
      setTeams(teamData);
      setMatchTeams(matchTeamsData);
    })();
  }, []);


  if (groups.length === 0) {
    return <span className="loader"></span>;
  }

  /**
   * A team row in the standings table.
   *
   * @typedef {Object} Standing
   * @property {number} id - Team identifier.
   * @property {string} name - Team name.
   * @property {string} flag - URL of the team's flag.
   * @property {number} pj - Matches played.
   * @property {number} gf - Goals for.
   * @property {number} gc - Goals against.
   * @property {number} dg - Goal difference.
   * @property {number} p - Matches lost.
   * @property {number} g - Matches won.
   * @property {number} e - Draws.
   * @property {number} ptos - Points.
   */
  let standings = calculateStandings(
    matches.filter((m) => m.round === "GROUP_STAGE"),
    teams,
    matchTeams,
  );

  const resolvedMatchTeams = resolveMatchTeams(
    standings,
    groups,
    teams,
    matches,
    matchTeams,
  );

  /**
   * A resolved match prepared for bracket rendering.
   *
   * @typedef {Object} BracketMatch
   * @property {Match} match - Match information.
   * @property {Team|undefined} homeTeam - Home team information.
   * @property {Team|undefined} awayTeam - Away team information.
   */
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

  const classifiedGroups = groups.map((group) => ({
    grupo: group.code,
    equipos: calculatePosition(getTeamsByGroup(teams, group.code), standings),
  }));

  /**
   * Changes the currently selected application section.
   *
   * @param {string} position - "groups"|"matches"|"keys".
   */
  function togglePosition(position) {
    setToggle(position);
  }

  /**
   * Updates the score of one team in a specific match.
   *
   * @param {number} matchId - Identifier of the match to update.
   * @param {string} slot - "home"|"away".
   * @param {number} score - New score.
   */
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
        <Matches
          matches={matches}
          updateMatchScore={updateMatchScore}
          teams={teams}
          matchTeams={resolvedMatchTeams}
        />
      ) : (
        <Keys matches={bracketData} />
      )}
    </>
  );
}

export default App;
