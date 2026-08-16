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
  let resolvedMatchTeams = matchTeams;
  let terceros = groups.map((group) =>
    getTeamBySource(`3${group.code}`, teams, table, matches, matchTeams),
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
      /**Si source = third
       * Encuentras los dos partidos que matchId sean iguales para third
       * Buscas el otro source va a ser por ejemplo 1E,
       * Buscas en cruces que tercero corresponde para 1E
       * cruces = ['3E-1A', '3J-1B', '3B-1D', '3C-1E', '3H-1G', '3G-1I', '3L-1K', '3I-1L']
       * buscas que equipoo es 3C i ese id lo pones en teamId
       */
      let otherSource = matchTeams.find(
        (m) => m.matchId === mt.matchId && m.slot !== mt.slot,
      ).source;
      let mainSource = thirdCruces2
        .find((c) => c.includes(otherSource))
        .slice(0, 2);
      let team = getTeamBySource(mainSource, teams, table, matches, matchTeams);

      mt.teamId = team?.id ?? null;
    } else {
      
      
      let team = getTeamBySource(mt.source, teams, table, matches, matchTeams);

      mt.teamId = team?.id ?? null;
      if(mt.source === 'W74'){
        
        
      }
    }
  });

  return resolveMatchTeams;
}

export default resolveMatchTeams;
