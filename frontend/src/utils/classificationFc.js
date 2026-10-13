import anexoC from "./anexoC.js";
import { getTeamBySource, sortTeams } from "../utils/auxiliaryFunctions.js";
import { setMatchTeamSource } from "../api/matchTeams.js";

/**
 * Retrieves the third-placed team from every group.
 *
 * @param {Team[]} teams - Array containing all tournament teams.
 * @param {Standing[]} table - Current group standings.
 * @param {Match[]} matches - All tournament matches.
 * @param {MatchTeam[]} resolvedMatchTeams - Relationship between macth and participant teams.
 * @param {Group[]} groups - Tournament groups.
 * @returns {(Standing|undefined)[]} Third-place standings from all groups.
 */
function getThirdPlace(teams, table, matches, resolvedMatchTeams, groups) {
  let third = groups.map((group) =>
    getTeamBySource(
      `3${group.code}`,
      teams,
      table,
      matches,
      resolvedMatchTeams,
    ),
  );

  let tableThird = third.map((tercero) =>
    table.find((t) => t.id === tercero.id),
  );
  return tableThird;
}

/**
 * Creates the FIFA third-place allocation key used by Annex C.
 *
 * @param {Standing[]} third - Qualified third-place teams.
 * @param {Teams[]} teams - Array containing all tournament teams.
 * @returns {string} Sorted group-code key used by the AnexoC mapping.
 */
function getKeyAnexoCSorted(third, teams) {
  let keyAnexoC = "";
  third.forEach((team) => {
    let group = teams.find((t) => t.id === team.id).group;
    keyAnexoC += group;
  });
  let keyAnexoCSorted = keyAnexoC
    .split("")
    .sort((a, b) => a.localeCompare(b))
    .join("");
  return keyAnexoCSorted;
}

/**
 * Resolves all currently determinable knockout participants
 * @param {Standing[]} table - Current group standings.
 * @param {Group[]} groups - Tournament groups.
 * @param {Teams[]} teams - Array containing all tournament teams.
 * @param {Matches[]} matches - Array containing all tournament matches.
 * @param {MatchTeams[]} matchTeams - Relationship between macth and participant teams.
 * @returns {MatchTeams[]} A copy of MatchTeams with teamId resolved in order of source.
 */
function resolveMatchTeams(table, groups, teams, matches, matchTeams) {
  if (groups.length > 0) {
    //Encontrar los 12 third
    let resolvedMatchTeams = matchTeams.map((mt) => ({ ...mt }));
    let third = getThirdPlace(
      teams,
      table,
      matches,
      resolvedMatchTeams,
      groups,
    );

    //Encontrar los mejores 8 third
    third = sortTeams(third).slice(0, 8);

    //Encontrar keyAnexoCSorted
    let keyAnexoCSorted = getKeyAnexoCSorted(third, teams);

    //Encontrar cruces
    let thirdCruces2 = anexoC[keyAnexoCSorted];

    //Sustituir en matchTeams teamId by source
    resolvedMatchTeams.forEach(async (mt) => {
      if (mt.source === null) return;
      if (mt.source === "third") {
        let otherSource = resolvedMatchTeams.find(
          (m) => m.matchId === mt.matchId && m.slot !== mt.slot,
        ).source;
        let mainSource = thirdCruces2
          .find((c) => c.includes(otherSource))
          .slice(0, 2);
        let team = getTeamBySource(
          mainSource,
          teams,
          table,
          matches,
          resolvedMatchTeams,
        );

        mt.teamId = team?.id ?? null;
        //Check they are diffrent
        let prev = matchTeams.find(prevMt => prevMt.id === mt.id).teamId;
        if (mt.teamId !== prev){
          await setMatchTeamSource(mt.matchId, mt.slot, mt.teamId);
        }
      } else {
        let team = getTeamBySource(
          mt.source,
          teams,
          table,
          matches,
          resolvedMatchTeams,
        );

        mt.teamId = team?.id ?? null;
        //Check they are diffrent
        let prev = matchTeams.find(prevMt => prevMt.id === mt.id).teamId;
        if (mt.teamId !== prev){
          await setMatchTeamSource(mt.matchId, mt.slot, mt.teamId);
        }
      }
    });

    return resolvedMatchTeams;
  } else return [];
}

export default resolveMatchTeams;
