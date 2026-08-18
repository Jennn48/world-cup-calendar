# Diccionario de variables del proyecto — World Cup Calendar

## 1. Equipos y grupos

### Variables de equipos

`grupos` [Array<Object>] : colección de todos los grupos del Mundial y sus equipos.

`groups` [Array<Object>] : estado de React que contiene los grupos recibidos por el componente `Groups`.

`g` [Object] : grupo individual durante una iteración.

`grupo` [String] : identificador/nombre del grupo, por ejemplo `"Grupo A"`.

`equipos` [Array<Object>] : equipos pertenecientes a un grupo.

`equipo` [Object] : equipo individual durante diferentes procesos de clasificación o búsqueda.

`team` [Object] : equipo individual durante iteraciones de arrays.

`teams` [Array<Object>] : colección de equipos utilizada en determinadas operaciones de clasificación.

`teamData` [Object] : estructura que permite obtener información de equipos a partir de una clave.

`nombre` [String] : nombre del equipo en la estructura actual de grupos.

`name` [String] : nombre del equipo utilizado en la tabla de clasificación.

`bandera` [String] : URL o ruta de la bandera de un equipo.

`flag` [String] : URL o ruta de bandera pasada al componente `Team`.

`flagLocal` [String] : bandera del equipo local en un partido del bracket.

`flagAway` [String] : bandera del equipo visitante en un partido del bracket.

`id` [Number] : identificador numérico actual de un equipo dentro de la tabla.

`position` [Number] : posición de un equipo dentro de la clasificación de su grupo.

`pos` [Number] : posición utilizada al buscar o clasificar un equipo.

---

## 2. Partidos

`matches` [Array<Object>] : colección principal de partidos de la fase de grupos.

`matchesData` [Array<Object>] : datos iniciales importados de los partidos.

`match` [Object] : partido individual durante una iteración o procesamiento.

`matchesPlayOff` [Object] : colección de partidos de las diferentes rondas de eliminación directa.

`setMatchesPlayOff` [Function] : función de React para actualizar los partidos de eliminación.

`playOffMatches` [Object] : estructura utilizada actualmente para representar los partidos visuales del bracket.

`setPlayOffMatches` [Function] : función de React para actualizar la estructura visual del bracket.

`local` [String] : nombre actual del equipo local.

`visitante` [String] : nombre actual del equipo visitante.

`localName` [String] : nombre del equipo local recibido como prop.

`awayName` [String] : nombre del equipo visitante recibido como prop.

`localScore` [Number|null] : marcador del equipo local.

`visitanteScore` [Number|null] : marcador del equipo visitante.

`awayScore` [Number|null] : marcador del equipo visitante utilizado en componentes.

`score` [Number|null] : marcador individual gestionado por `TeamCard`.

`matchScore` [Object] : estado local que contiene los marcadores de un partido.

`date` [String] : fecha de un partido utilizada por los componentes del bracket.

`fecha` [String] : fecha del partido en la estructura actual de datos.

`time` [String] : nombre recomendado para representar una hora; actualmente se utiliza principalmente `hora`.

`hora` [String] : hora del partido en la estructura actual.

`group` [String] : grupo o fase del partido recibido como prop.

`roundName` [String] : nombre de la ronda utilizado al generar partidos de eliminación.

`roundName` [String] : nombre identificador de la ronda que se está generando.

`status` [String] : estado del partido; todavía no está implementado formalmente en la estructura actual.

---

## 3. Clasificación

`table` [Array<Object>] : tabla base con información estadística inicial de todos los equipos.

`tableData` [Array<Object>] : tabla calculada utilizada para mostrar la clasificación.

`setTableData` [Function] : función de React utilizada actualmente para modificar `tableData`.

`tableLocal` [Object] : información estadística del equipo local.

`tableAway` [Object] : información estadística del equipo visitante.

`tableInfo` [Object] : información temporal de clasificación utilizada durante el cálculo.

`tableTeam` [Object] : información estadística de un equipo concreto.

`datosTabla` [Object] : datos de clasificación encontrados para un equipo.

`equiposOrdenados` [Array<Object>] : equipos de un grupo combinados con sus estadísticas y ordenados por posición.

`pj` [Number] : partidos jugados.

`g` [Number] : partidos ganados.

`e` [Number] : partidos empatados.

`p` [Number] : partidos perdidos.

`ptos` [Number] : puntos obtenidos.

`gf` [Number] : goles a favor.

`gc` [Number] : goles en contra.

`dg` [Number] : diferencia de goles.

`position` [Number] : posición del equipo en la clasificación.

`item` [Object] : elemento individual durante una iteración de datos de clasificación.

---

## 4. Estado de React

`toggle` [String] : determina qué sección principal de la aplicación se muestra.

`setToggle` [Function] : actualiza el valor de `toggle`.

`matches` [Array<Object>] : estado React de los partidos de fase de grupos.

`setMatches` [Function] : actualiza los partidos de fase de grupos.

`matchesPlayOff` [Object] : estado React que contiene las diferentes rondas de eliminación.

`setMatchesPlayOff` [Function] : actualiza `matchesPlayOff`.

`playOffMatches` [Object] : estado React que contiene la estructura visual del bracket.

`setPlayOffMatches` [Function] : actualiza `playOffMatches`.

`groups` [Array<Object>] : estado React de los grupos.

`setGroups` [Function] : actualiza `groups`; actualmente parece innecesario.

`tableData` [Array<Object>] : estado local de `Table`; actualmente parece poder convertirse en una variable normal.

`setTableData` [Function] : setter de `tableData`; probablemente puede eliminarse.

`editing` [Boolean] : indica si `TeamCard` está en modo edición.

`setEditing` [Function] : cambia el modo edición de `TeamCard`.

`score` [Number|null] : marcador local de `TeamCard`.

`setScore` [Function] : actualiza el marcador local de `TeamCard`.

`matchScore` [Object] : estado local del marcador de `CardMatch`.

`setMatchScore` [Function] : setter de `matchScore`; actualmente parece no utilizarse correctamente.

`position` [String] : estado del componente `Toggle`.

`setPosition` [Function] : actualiza `position`.

---

## 5. Props de componentes

### `Groups`

`props.grupos` [Array<Object>] : grupos recibidos desde el componente padre.

`props.table` [Array<Object>] : tabla de clasificación recibida desde el padre.

### `Table`

`props.grupo` [String] : nombre/identificador del grupo.

`props.equipos` [Array<Object>] : equipos pertenecientes al grupo.

`props.table` [Array<Object>] : datos de clasificación.

### `Team`

`props.name` [String] : nombre del equipo.

`props.flag` [String] : bandera del equipo.

`props.position` [Number] : posición en la clasificación.

`props.pj` [Number] : partidos jugados.

`props.g` [Number] : partidos ganados.

`props.e` [Number] : partidos empatados.

`props.p` [Number] : partidos perdidos.

`props.ptos` [Number] : puntos.

`props.gf` [Number] : goles a favor.

`props.gc` [Number] : goles en contra.

`props.dg` [Number] : diferencia de goles.

### `CardMatch`

`props.group` [String] : fase o grupo al que pertenece el partido.

`props.localName` [String] : nombre del equipo local.

`props.awayName` [String] : nombre del equipo visitante.

`props.localScore` [Number|null] : marcador local.

`props.awayScore` [Number|null] : marcador visitante.

`props.date` [String] : fecha del partido.

`props.hour` [String] : hora del partido.

`props.setMatches` [Function] : setter del estado principal de partidos.

### `TeamCard`

`props.name` [String] : nombre del equipo.

`props.flagSrc` [String] : bandera del equipo.

`props.score` [Number|null] : marcador mostrado.

`props.addScore` [Function] : función utilizada para comunicar un cambio de marcador.

### `Date`

`props.date` [String] : fecha mostrada.

`props.hour` [String] : hora mostrada.

### `Matches`

`props.matches` [Array<Object>] : partidos de fase de grupos.

`props.matchesPlayOff` [Object] : partidos de eliminación.

`props.setMatches` [Function] : setter de los partidos de grupos.

`props.setMatchesPlayOff` [Function] : setter de los partidos de eliminación.

### `Toggle`

`props.onToggle` [Function] : función ejecutada al cambiar la sección visible.

### `Bracket`

`props.matches` [Object] : estructura de partidos utilizada para construir el bracket.

`props.final` [Object] : partido de la final.

`props.r16` [Array<Object>] : partidos de octavos.

`props.r8` [Array<Object>] : partidos de cuartos/octavos según la estructura actual.

`props.quarter` [Array<Object>] : partidos de cuartos.

`props.semi` [Array<Object>] : partidos de semifinales.

`props.flagLocal` [String] : bandera local del partido mostrado.

`props.flagAway` [String] : bandera visitante del partido mostrado.

`props.date` [String] : fecha mostrada en un partido del bracket.

---

# 6. Variables de clasificación y playoffs

`round32` [Array<Object>] : estructura de cruces de la primera ronda de eliminación.

`round16` [Array<Object>] : estructura de cruces de la siguiente ronda.

`quarterFinals` [Array<Object>] : estructura de cruces de cuartos de final.

`semiFinals` [Array<Object>] : estructura de cruces de semifinales.

`final` [Array<Object>] : estructura del partido final.

`dates` [Object] : fechas asociadas a las diferentes rondas de eliminación.

`keyAnexoCSorted` [String] : clave seleccionada de las combinaciones del anexo C después de ordenar las posibilidades.

`thirdCruces` [Array<Object>] : cruces generados utilizando los terceros clasificados.

`cruces` [Array<Object>] : cruces de una ronda determinada.

`crucesRond16` [Array<Object>] : cruces generados para la ronda de 16.

`crucesRond8` [Array<Object>] : cruces generados para la ronda de 8.

`crucesQuarter` [Array<Object>] : cruces generados para cuartos.

`crucesSemi` [Array<Object>] : cruces generados para semifinales.

`cruceFinal` [Array<Object>] : cruce correspondiente a la final.

`matchesRond16` [Array<Object>] : partidos generados para la ronda de 16.

`matchesRond8` [Array<Object>] : partidos generados para la ronda de 8.

`matchesQuarter` [Array<Object>] : partidos generados para cuartos.

`matchesSemi` [Array<Object>] : partidos generados para semifinales.

`matchFinal` [Object] : partido generado para la final.

`winners` [Array<Object>|Array<String>] : ganadores obtenidos de los partidos de una ronda.

`winner` [Object|String|null] : ganador individual de un partido.

`keys` [Object] : estructura de claves utilizada para construir el bracket.

`playOffCruces` [Object] : estructura de cruces utilizada para construir las dos partes del bracket.

`flagLocal` [String] : bandera del equipo local generada para el bracket.

`flagAway` [String] : bandera del equipo visitante generada para el bracket.

`match` [Object] : partido que se está modificando durante la generación del bracket.

`classified` [Object] : equipos clasificados obtenidos a partir de la tabla.

`keyAnexoC` [String] : clave de una combinación dentro del anexo C.

`first` [Object] : primer equipo o grupo utilizado durante una operación de clasificación.

`second` [Object] : segundo equipo o grupo utilizado durante una operación de clasificación.

`third` [Object] : tercer equipo o grupo utilizado durante una operación de clasificación.

`key` [String|Number] : clave utilizada durante diferentes iteraciones y accesos a objetos.

`game` [Object] : partido individual durante la generación de una ronda.

`c` [Object] : elemento temporal utilizado durante operaciones con combinaciones.

`e` [Object] : elemento temporal utilizado durante operaciones con equipos.

---

# 7. Funciones principales

`App()` [Function] : componente principal de la aplicación.

`calculateTable(matches)` [Function] : calcula las estadísticas de los equipos a partir de los partidos.

`calculatePosition(group)` [Function] : calcula o actualiza las posiciones de los equipos de un grupo.

`sortTeams(teams)` [Function] : ordena equipos según sus resultados de clasificación.

`togglePosition(position)` [Function] : modifica la posición de un equipo durante determinadas operaciones de clasificación.

`calculateRound16(table, groups, roundName)` [Function] : calcula los cruces y partidos de la primera ronda de eliminación.

`calculateRound8(matchesRond16, roundName)` [Function] : genera la siguiente ronda a partir de los ganadores de la ronda anterior.

`calculateQuarter(matchesRond8, roundName)` [Function] : genera los cuartos de final.

`calculateSemi(matchesQuarter, roundName)` [Function] : genera las semifinales.

`calculateFinal(matchesSemi, roundName)` [Function] : genera la final.

`getWinners(matches, claves)` [Function] : obtiene los ganadores de una colección de partidos.

`setPlayOffMatches(matches, equipos, clave)` [Function] : asigna equipos/banderas a la estructura visual del bracket.

`getClassified(table, groups)` [Function] : obtiene los equipos clasificados a partir de la clasificación.

`generateMatches(cruces, teamData, roundName, dates)` [Function] : transforma cruces en objetos de partidos.

`findFlag(countryName)` [Function] : busca la bandera de un equipo a partir de su nombre.

`setLocalScore(score)` [Function] : actualiza el marcador del equipo local.

`setAwayScore(score)` [Function] : actualiza el marcador del equipo visitante.

`sendScore()` [Function] : comunica el marcador introducido desde `TeamCard`.

`handleClick(e)` [Function] : gestiona el clic del componente `Toggle`.

---

# 8. Variables de representación del bracket

`r16Left` [Array<Object>] : partidos de octavos mostrados en el lado izquierdo.

`r16Right` [Array<Object>] : partidos de octavos mostrados en el lado derecho.

`r8Left` [Array<Object>] : partidos de la siguiente ronda mostrados en el lado izquierdo.

`r8Right` [Array<Object>] : partidos de la siguiente ronda mostrados en el lado derecho.

`quarterLeft` [Array<Object>] : cuartos mostrados en el lado izquierdo.

`quarterRight` [Array<Object>] : cuartos mostrados en el lado derecho.

`semiLeft` [Array<Object>] : semifinal del lado izquierdo.

`semiRight` [Array<Object>] : semifinal del lado derecho.

`final` [Array<Object>] : partido de la final mostrado en el centro.

`flagLocal` [String] : bandera local utilizada exclusivamente para representación visual.

`flagAway` [String] : bandera visitante utilizada exclusivamente para representación visual.

`date` [String] : fecha mostrada en el partido del bracket.

---

# 9. Variables de iteración

`index` [Number] : índice de un elemento durante una iteración.

`i` [Number] : índice utilizado en algunas operaciones.

`team` [Object] : equipo actual durante una iteración.

`teamTable` [Object] : información de clasificación asociada al equipo actual.

`match` [Object] : partido actual durante una iteración.

`item` [Object] : elemento actual durante una iteración.

`td` [Object] : registro de clasificación encontrado dentro de `tableData`.

`g` [Object] : grupo actual durante una iteración.

`e` [Object] : elemento actual durante determinadas operaciones.

`c` [Object] : elemento actual durante operaciones con combinaciones.

---

# 10. Importaciones principales

`worldCup` [String/Asset] : imagen de la Copa del Mundo.

`copaMundial` [String/Asset] : imagen utilizada en el header/hero.

`Keys` [ReactComponent] : componente principal del esquema de llaves.

`Groups` [ReactComponent] : componente de fase de grupos.

`Matches` [ReactComponent] : componente que muestra los partidos.

`Header` [ReactComponent] : encabezado de la aplicación.

`Hero` [ReactComponent] : sección principal/hero.

`Toggle` [ReactComponent] : selector para cambiar entre vistas.

`Final` [ReactComponent] : componente de la final.

`MatchBracket` [ReactComponent] : representación visual de un partido del bracket.

`Round16` [ReactComponent] : representación de una ronda del bracket.

`Round8` [ReactComponent] : representación de una ronda del bracket.

`Quarter` [ReactComponent] : representación de los cuartos.

`Semi` [ReactComponent] : representación de las semifinales.

`LeftBracket` [ReactComponent] : lado izquierdo del bracket.

`RightBracket` [ReactComponent] : lado derecho del bracket.

`CenterBracket` [ReactComponent] : zona central del bracket y final.

`Table` [ReactComponent] : tabla de clasificación de un grupo.

`Team` [ReactComponent] : fila de un equipo en la tabla.

`CardMatch` [ReactComponent] : tarjeta de un partido.

`TeamCard` [ReactComponent] : representación de un equipo y su marcador.

`Date` [ReactComponent] : representación de fecha y hora.

`matchesData` [Array<Object>] : datos iniciales de partidos.

`table` [Array<Object>] : datos iniciales de clasificación.

`grupos` [Array<Object>] : datos iniciales de grupos.

`anexoC` [Object] : combinaciones de terceros clasificados utilizadas para determinar los cruces.

`playOffMatches` [Object] : datos iniciales de la estructura visual de eliminación.

---

# 11. Propiedades actuales de los objetos de partido

`grupo` [String] : grupo al que pertenece el partido.

`local` [String] : nombre del equipo local.

`visitante` [String] : nombre del equipo visitante.

`localScore` [Number|null] : goles del equipo local.

`visitanteScore` [Number|null] : goles del equipo visitante.

`fecha` [String] : fecha del partido.

`hora` [String] : hora del partido.

---

# 12. Propiedades actuales de los objetos de equipo

`nombre` [String] : nombre del equipo.

`bandera` [String] : URL/ruta de la bandera.

`id` [Number] : identificador numérico actual.

---

# 13. Propiedades actuales de clasificación

`name` [String] : nombre del equipo.

`id` [Number] : identificador del equipo.

`position` [Number] : posición.

`pj` [Number] : partidos jugados.

`g` [Number] : partidos ganados.

`e` [Number] : partidos empatados.

`p` [Number] : partidos perdidos.

`ptos` [Number] : puntos.

`gf` [Number] : goles a favor.

`gc` [Number] : goles en contra.

`dg` [Number] : diferencia de goles.