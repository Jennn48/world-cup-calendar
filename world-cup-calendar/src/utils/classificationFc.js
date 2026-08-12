import anexoC from "./anexoC.js";
import groups from "./grupos.js";

const round32 = [
  { local: "1E", away: "third" },
  { local: "1I", away: "third" },
  { local: "2A", away: "2B" },
  { local: "1F", away: "2C" },
  { local: "2K", away: "2L" },
  { local: "1H", away: "2J" },
  { local: "1D", away: "third" },
  { local: "1G", away: "third" },

  { local: "1C", away: "2F" },
  { local: "2E", away: "2I" },
  { local: "1A", away: "third" },
  { local: "1L", away: "third" },
  { local: "1J", away: "2H" },
  { local: "2D", away: "2G" },
  { local: "1B", away: "third" },
  { local: "1K", away: "third" },
];

const round16 = [
  { local: "W1", away: "W2" },
  { local: "W3", away: "W4" },
  { local: "W5", away: "W6" },
  { local: "W7", away: "W8" },
  { local: "W9", away: "W10" },
  { local: "W11", away: "W12" },
  { local: "W13", away: "W14" },
  { local: "W15", away: "W16" },
];

const quarterFinals = [
  { local: "W17", away: "W18" },
  { local: "W19", away: "W20" },
  { local: "W21", away: "W22" },
  { local: "W23", away: "W24" },
];

const semiFinals = [
  { local: "W25", away: "W26" },
  { local: "W27", away: "W28" },
];

const final = [{ local: "W29", away: "W30" }];

// ================= FECHAS =================

const dates = {
  round32: [
    "29/6",
    "30/6",
    "28/6",
    "29/6",
    "2/7",
    "2/7",
    "1/7",
    "1/7",
    "29/6",
    "30/6",
    "30/6",
    "1/7",
    "3/7",
    "3/7",
    "2/7",
    "2/7",
  ],

  round16: ["5/7", "5/7", "6/7", "6/7", "7/7", "7/7", "8/7", "8/7"],

  quarterFinals: ["11/7", "11/7", "12/7", "12/7"],

  semiFinals: ["15/7", "16/7"],

  final: ["19/7"],
};

export function calculateRound16(table, groups, roundName) {
  //Encontrar los participantes(clasificados)
  const { classified, keyAnexoC } = getClassified(table, groups);
  //Encontrar quien juega contra quien
  let keyAnexoCSorted = keyAnexoC
    .split("")
    .sort((a, b) => a.localeCompare(b))
    .join("");
  let thirdCruces = anexoC[keyAnexoCSorted];
  let cruces = round32.map((match) => ({
    ...match,
    away:
      match.away === "third"
        ? thirdCruces.find((c) => c.includes(match.local)).slice(0, 2)
        : match.away,
  }));

  const matchesRond16 = generateMatches(
    cruces,
    classified,
    roundName,
    dates["round32"],
  );

  const crucesRond16 = setPlayOffMatches(matchesRond16, classified, "r16");

  return [matchesRond16, crucesRond16];
}

export function calculateRound8(matchesRond16, roundName, groups) {
  //Obtener los 16 ganadores
  let winners = getWinners(matchesRond16, round16, groups);

  const matchesRond8 = generateMatches(
    round16,
    winners,
    roundName,
    dates["round16"],
  );

  const crucesRond8 = setPlayOffMatches(matchesRond8, winners, "r8");

  return [matchesRond8, crucesRond8];
}

export function calculateQuarter(matchesRond8, roundName, groups) {
  //Obtener los 8 ganadores
  let winners = getWinners(matchesRond8, quarterFinals, groups);

  const matchesQuarter = generateMatches(
    quarterFinals,
    winners,
    roundName,
    dates["quarterFinals"],
  );

  const crucesQuarter = setPlayOffMatches(matchesQuarter, winners, "quarter");

  return [matchesQuarter, crucesQuarter];
}

export function calculateSemi(matchesQuarter, roundName, groups) {
  //Obtener los 8 ganadores
  let winners = getWinners(matchesQuarter, semiFinals, groups);

  const matchesSemi = generateMatches(
    semiFinals,
    winners,
    roundName,
    dates["semiFinals"],
  );

  const crucesSemi = setPlayOffMatches(matchesSemi, winners, "semi");

  return [matchesSemi, crucesSemi];
}

export function calculateFinal(matchesSemi, roundName, groups) {
  //Obtener los 8 ganadores
  let winners = getWinners(matchesSemi, final, groups);

  const matchFinal = generateMatches(final, winners, roundName, dates["final"]);

  const cruceFinal = {
    final: {
      flagLocal: winners["W29"].flag,
      flagAway: winners["W30"].flag,
      date: matchFinal[0].fecha,
    },
  };

  return [matchFinal, cruceFinal];
}

function getWinners(matches, claves, groups) {
  const winners = {};

  claves.forEach((match) => {
    winners[match.local] = { flag: "z", name: "" };
    winners[match.away] = { flag: "y", name: "" };
  });

  let keys = Object.keys(winners);

  matches.forEach((match, index) => {
    let winner;

    winner =
      match.localScore > match.visitanteScore ? match.local : match.visitante;

    if (match.localScore == null && match.visitanteScore == null) {
      winner = match.local;
    }

    const equipo = groups
      .flatMap((group) => group.equipos)
      .find((e) => e.name === winner);

    winners[keys[index]] = { flag: equipo.bandera, name: equipo.name };
  });

  return winners;
}

function setPlayOffMatches(matches, equipos, clave) {
  let playOffCruces = {};
  playOffCruces[`${clave}Left`] = [];
  playOffCruces[`${clave}Right`] = [];

  matches.forEach(({ local, visitante, fecha }, index) => {
    let flagLocal = Object.values(equipos).find((e) => e.name === local).flag;
    let flagAway = Object.values(equipos).find(
      (e) => e.name === visitante,
    ).flag;

    let match = { flagLocal, flagAway, date: fecha };

    if (index >= matches.length / 2) {
      playOffCruces[`${clave}Right`].push(match);
    } else {
      playOffCruces[`${clave}Left`].push(match);
    }
  });

  return playOffCruces;
}

function getClassified(table, groups) {
  const classified = {};
  let keyAnexoC = "";
  let third = [];

  groups.forEach((group) => {
    group.equipos.forEach((team, index) => {
      const pos = index + 1;
      if (pos > 3) return;

      if (pos === 3) {
        let dataTable = table.find(td => td.name === team.name);
        third.push({name: team.name, flag: team.flag, group: group.grupo, ...dataTable});
      } else {
        const key = `${pos}${group.grupo}`;
        classified[key] = { flag: team.flag, name: team.name };
        
      }
    });
  });

  let qualifiedThird = sortTeams(third).slice(0,8);
  qualifiedThird.forEach(team => {
    const key = `3${team.group}`;
        classified[key] = { flag: team.flag, name: team.name };
        keyAnexoC += team.group;
  });
  return { classified, keyAnexoC };
}

function generateMatches(cruces, teamData, roundName, dates) {
  return cruces.map((game, index) => {
    return {
      grupo: roundName,
      local: teamData[game.local].name,
      visitante: teamData[game.away].name,
      localScore: null,
      visitanteScore: null,
      fecha: dates[index],
      hora: "21:00",
    };
  });
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

// export default calculateBrackets;
