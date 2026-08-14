export function getTeamById(teams, id){
    return teams.find(team => team.id === id);
}

export function getTeamsByGroup(teams, group){
    return teams.filter(team => team.group === group);
}

export function getMatchTeams(match, matchTeams, teams){
   //Wich teams play this match
   let matchTeamSlots = matchTeams.filter(mt => mt.matchId === match.id);
   //Find the id of both teams
    let teamSlotsId = matchTeamSlots.map(mts => mts.teamId);
    //Find the teams by the id
    return teamSlotsId.forEach(id => getTeamById(teams, id));
}

export default {getMatchTeams, getTeamById, getTeamsByGroup};