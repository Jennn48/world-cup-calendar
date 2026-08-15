export function getTeamBySource(source){
    //Hay 3 tipos de source: 1A, third, W101
    //Si source = third hay que determinar cual de los 3eros le corresponde segun anexoC
    //Si 1A o 2B hay que ver la posicion y el grupo
    //Estas dos cosas ya las hago en classification

    //Si W101 hay que buscar el partido M101 o id=101 en matches y ver el marcador si homeScore > awayScore, entonces en hy que buscar matchTeams donde matchId = 101 y slot = home y entonces me da el teamId, ese teamId lo debo buscar en team y devolver team
}