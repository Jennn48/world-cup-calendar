import anexoC from "./anexoC.js";
import {
  getMatchTeams,
  getTeamById,
  getTeamsByGroup,
} from "../utils/auxiliaryFunctions.js";
import { matchesData } from "./index.js";
import matchTeams from "../data/matchTeams.js";

const round32 = [
  { local: "1E", away: "third", id: 73},
  { local: "1I", away: "third", id: 74 },
  { local: "2A", away: "2B", id: 75 },
  { local: "1F", away: "2C", id: 76 },
  { local: "2K", away: "2L", id: 77 },
  { local: "1H", away: "2J", id: 78 },
  { local: "1D", away: "third", id: 79 },
  { local: "1G", away: "third", id: 80 },

  { local: "1C", away: "2F", id: 81 },
  { local: "2E", away: "2I", id: 82 },
  { local: "1A", away: "third", id: 83 },
  { local: "1L", away: "third", id: 84 },
  { local: "1J", away: "2H", id: 85 },
  { local: "2D", away: "2G", id: 86 },
  { local: "1B", away: "third", id: 87 },
  { local: "1K", away: "third", id: 88 },
];

const round16 = [
  { local: "W1", away: "W2", id: 89 },
  { local: "W3", away: "W4", id: 90 },
  { local: "W5", away: "W6", id:91 },
  { local: "W8", away: "W8", id:92 },
  { local: "W9", away: "W10", id: 93 },
  { local: "W11", away: "W12", id: 94 },
  { local: "W13", away: "W14", id: 95 },
  { local: "W15", away: "W16", id: 96 },
];

const quarterFinals = [
  { local: "W17", away: "W18", id: 97 },
  { local: "W19", away: "W20", id: 98 },
  { local: "W21", away: "W22", id: 99 },
  { local: "W23", away: "W24", id: 100 },
];

const semiFinals = [
  { local: "W25", away: "W26", id: 101 },
  { local: "W27", away: "W28", id: 102 },
];

const final = [{ local: "W29", away: "W30", id: 103 }];

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

export function calculateRound16(table, groups, teams, roundName) {
  
  //Encontrar los participantes(clasificados)
  const { classified, keyAnexoC } = getClassified(table, groups, teams);
  
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

  

  return [matchesRond16];
}

export function calculateRound8(matchesRond16, roundName, groups, teams) {
  //Obtener los 16 ganadores
   
  let winners = getWinners(matchesRond16, round16, groups, teams);
  
console.log(winners);

  const matchesRond8 = generateMatches(
    round16,
    winners,
    roundName,
    dates["round16"],
  );


  return [matchesRond8];
}

export function calculateQuarter(matchesRond8, roundName, groups, teams) {
  //Obtener los 8 ganadores
  let winners = getWinners(matchesRond8, quarterFinals, groups, teams);
  
  const matchesQuarter = generateMatches(
    quarterFinals,
    winners,
    roundName,
    dates["quarterFinals"],
  );


  return [matchesQuarter];
}

export function calculateSemi(matchesQuarter, roundName, groups, teams) {
  //Obtener los 8 ganadores
  let winners = getWinners(matchesQuarter, semiFinals, groups, teams);

  const matchesSemi = generateMatches(
    semiFinals,
    winners,
    roundName,
    dates["semiFinals"],
  );


  return [matchesSemi];
}

export function calculateFinal(matchesSemi, roundName, groups, teams) {
  //Obtener los 8 ganadores
  let winners = getWinners(matchesSemi, final, groups, teams)

  const matchFinal = generateMatches(final, winners, roundName, dates["final"]);

  return [matchFinal];
}

function getWinners(matches, claves, groups, teams) {  
  const winners = {};
  
  claves.forEach((match) => {
    winners[match.local] = { flag: "z", name: "", id: null };
    winners[match.away] = { flag: "y", name: "", id: null };
  });

  let keys = Object.keys(winners);

  matches.forEach((match, index) => {
    let winner;
    let localScore = match.homeScore;
    let visitanteScore = match.awayScore;
    
    let {home, away} = getMatchTeams(match, matchTeams, teams);
    //Tengo que hacer una funcion que resuelva el source y devuelva {id: 25,name: "Belgica",flagUrl: "https://flagsapi.com/BE/flat/64.png",code: "BE",group: "G",}    
    
    winner =
      localScore > visitanteScore ? home : away;

    if (localScore == null && visitanteScore == null) {
      winner = home;
    }
    
    //let equipo = getTeamsByGroup().find(e => e.name === winner);
    const equipo = teams.find((e) => e.name === winner);
    

    winners[keys[index]] = { flag: equipo?.flagUrl ?? "/blanck.webp", name: equipo?.name ?? "", id: equipo?.id ?? null};
  });
  return winners;
}

function getClassified(table, groups, teams) {
  const classified = {};
  let keyAnexoC = "";
  let third = [];

  groups.forEach((group) => {
    let equipos = getTeamsByGroup(teams, group.code);
    
    equipos.forEach((team, index) => {
      const pos = index + 1;
      if (pos > 3) return;

      if (pos === 3) {
        let dataTable = table.find(td => td.name === team.name);
        third.push({name: team.name, flag: team.flagUrl, group: team.group, ...dataTable});
      } else {
        const key = `${pos}${team.group}`;
        classified[key] = { flag: team.flagUrl, name: team.name, id: team.id };
        
      }
    });
  });

  let qualifiedThird = sortTeams(third).slice(0,8);
  qualifiedThird.forEach(team => {
    const key = `3${team.group}`;
        classified[key] = { flag: team.flag, name: team.name, id: team.id };
        keyAnexoC += team.group;
  });
  return { classified, keyAnexoC };
}

function generateMatches(cruces, teamData, roundName, dates) {
  //RoundName should be Round32 o alguna norma
  /* la salida deberia ser 
  {id: no idea how generate this,
  round: roundName,
  groupCode: null,
  matchNumber: M${id},
  matchTime: dates.hora,
  matchDate: dates.date,
  status: scheduled,
  homeScore: null,
  awayScore: null
  }*/  
  return cruces.map((game, index) => {
    
    return {
      id: game.id,
      round: roundName,
      groupCode: null,
      matchNumber: `M${game.id}`,
      matchTime: "21:00",
      matchDate: dates[index],
      status: "scheduled",
      homeScore: null,
      awayScore: null,
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
