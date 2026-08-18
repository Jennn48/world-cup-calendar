import anexoC from "./anexoC.js";
import { getTeamBySource, sortTeams } from "../utils/auxiliaryFunctions.js";

function getThirdPlace(teams, table, matches, resolvedMatchTeams, groups) {
  let terceros = groups.map((group) =>
    getTeamBySource(
      `3${group.code}`,
      teams,
      table,
      matches,
      resolvedMatchTeams,
    ),
  );

  let tableThird = terceros.map((tercero) =>
    table.find((t) => t.id === tercero.id),
  );
  return tableThird;
}

function getKeyAnexoCSorted(terceros, teams) {
  let keyAnexoC = "";
  terceros.forEach((team) => {
    let group = teams.find((t) => t.id === team.id).group;
    keyAnexoC += group;
  });
  let keyAnexoCSorted = keyAnexoC
    .split("")
    .sort((a, b) => a.localeCompare(b))
    .join("");
  return keyAnexoCSorted;
}

function resolveMatchTeams(
  table,
  groups,
  teams,
  roundName,
  matches,
  matchTeams,
) {
  //Encontrar los 12 terceros

  let resolvedMatchTeams = matchTeams.map((mt) => ({ ...mt }));
  let third = getThirdPlace(
    teams,
    table,
    matches,
    resolvedMatchTeams,
    groups,
  );

  //Encontrar los mejores 8 terceros
  third = sortTeams(third).slice(0, 8);

  //Encontrar keyAnexoCSorted
  let keyAnexoCSorted = getKeyAnexoCSorted(third, teams)

  //Encontrar cruces
  let thirdCruces2 = anexoC[keyAnexoCSorted];

  //Sustituir en matchTeams teamId by source
  resolvedMatchTeams.forEach((mt) => {
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
    } else {
      let team = getTeamBySource(
        mt.source,
        teams,
        table,
        matches,
        resolvedMatchTeams,
      );

      mt.teamId = team?.id ?? null;
      if (mt.source === "W74") {
      }
    }
  });

  return resolvedMatchTeams;
}

export default resolveMatchTeams;
