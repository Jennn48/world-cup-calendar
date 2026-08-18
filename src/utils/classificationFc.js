import anexoC from "./anexoC.js";
import {
  getTeamBySource,
  sortTeams
} from "../utils/auxiliaryFunctions.js";



function resolveMatchTeams(
  table,
  groups,
  teams,
  roundName,
  matches,
  matchTeams,
) {
  //Encontrar los 12 terceros
  let resolvedMatchTeams = matchTeams.map(mt => ({...mt}));
  let terceros = groups.map((group) =>
    getTeamBySource(`3${group.code}`, teams, table, matches, resolvedMatchTeams),
  );

  let tableThird = terceros.map((tercero) =>
    table.find((t) => t.id === tercero.id),
  );

  //Encontrar los mejores 8 terceros
  terceros = sortTeams(tableThird).slice(0, 8);

  //Encontrar keyAnexoCSorted
  let keyAnexoC2 = "";
  terceros.forEach((team) => {
    let group = teams.find((t) => t.id === team.id).group;
    keyAnexoC2 += group;
  });
  let keyAnexoCSorted2 = keyAnexoC2
    .split("")
    .sort((a, b) => a.localeCompare(b))
    .join("");

  //Encontrar cruces
  let thirdCruces2 = anexoC[keyAnexoCSorted2];

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
      let team = getTeamBySource(mainSource, teams, table, matches, resolvedMatchTeams);

      mt.teamId = team?.id ?? null;
    } else {
      
      
      let team = getTeamBySource(mt.source, teams, table, matches, resolvedMatchTeams);

      mt.teamId = team?.id ?? null;
      if(mt.source === 'W74'){
        
        
      }
    }
  });

  return resolvedMatchTeams;
}

export default resolveMatchTeams;
