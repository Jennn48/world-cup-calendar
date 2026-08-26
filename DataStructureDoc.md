# Data Structure and Dependencies

This doc defines the structure, properties, usage, dependencies and relationships of the four main data structure in the app to support a smooth migration to a database system.

## Groups
Define all world cup groups one by one.

### Structure
[
    {
        "id": 1,
        "name": "Grupo A",
        "code": "A"
    }
]

### Properties
id(number) - Unique group identifier.
name(string) - Group name (`Grupo ${code}`).
code(string) - Unique group letter used to identify the group.

### Where is used (read properties)
App.jsx -► resolveMatchTeams()
App.jsx -► classifiedGroups()

### Where is modified (write properties)
Not modified.

### Relationships
GROUPS ────► TEAMS  1:N
---

## Matches
Define all tournament matches.

### Structure
const matches = [
  {
    id: 1,
    round: "GROUP_STAGE",
    groupCode: "A",
    matchNumber: "M1",
    matchTime: "21:00",
    matchDate: "Jue, 11/6",
    status: "scheduled",
    homeScore: null,
    awayScore: null,
  }
]

### Properties
id(number) - Unique match identifier.
round(string) - Tournament round.
groupCode(string|null) - Group code for group-stage matches. Null for knockout-stage matches.
matchNumber(string) - Match identifier in tournament regulations.
matchTime(string) - Match time.
matchDate(string) - Match date.
status("scheduled"|"played") - Current status of the match.
homeScore(number|null) - Home team score.
awayScore(number|null) - Away team score.

### Where is used (read properties)
App.jsx -► useState() : to set matches.

### Where is modified (write properties)
homeScore & awayScore: 
App.jsx -► updateMatchScore() set the score get from Matches/TeamCard.

status: It will be updated in the future, but it is not currently modified.

### Relationships
MATCHES ────► TEAMS         N:M
MATCHES ────► MATCHTEAMS    1:N

---

## MatchTeams
Define the relationship between a match and one of its participant slots.

### Structure
const matchTeams = [
  {
    id: 1,
    matchId: 1,
    slot: "home",
    teamId: 1,
    source: null,
  },
  {
    id: 2,
    matchId: 1,
    slot: "away",
    teamId: 3,
    source: null,
  }
]

### Properties
id(number) - Unique matchTeam identifier.
matchId(number) - Identifier of the related match.
slot("home"|"away") - Indicates which team occupies the home or away side of the match, even though neither team is playing in its own stadium.
teamId(number|null) - Resolved team identifier, if available.
source(string|null) - Source used to determine the participant, if needed.

### Where is used (read properties)
App.jsx -► calculateStandings()
App.jsx -► resolveMatchTeams()

### Where is modified (write properties)
classificationFc.js -► resolveMatchTeams() : modifies teamId from null to a number ID.

### Relationships
MATCHTEAMS ────► TEAMS      N:1
MATCHTEAMS ────► MATCHES    N:1

---

## Teams
Define all the teams participating in the tournament.

### Structure
const teams = [
  {
    id: 1,
    name: "Mexico",
    flagUrl: "https://flagsapi.com/MX/flat/64.png",
    code: "MX",
    group: "A",
  }
]

### Properties
id(number) - Unique team identifier.
name(string) - Team name.
flagUrl(string) - URL of the team's flag.
code(string) - Team code.
group(string) - Group code.

### Where is used (read properties)
App.jsx -► calculateStandings()
App.jsx -► resolveMatchTeams()
App.jsx -► getTeamsByGroup()
App.jsx -► getBracketData()
App.jsx -► Matches component

### Where is modified (write properties)
Not modified

### Relationships
TEAMS ────► GROUPS      N:1
TEAMS ────► MATCHES     N:M
TEAMS ────► MATCHTEAMS  1:N

---
## ER diagram
┌─────────────┐                 ┌─────────────┐
│   GROUPS    │        1:N      │    TEAMS    │
├─────────────┤      ──────►    ├─────────────┤
│ id          │                 │ id          │
│ name        │                 │ name        │
│ code        │                 │ flagUrl     │
└─────────────┘                 │ code        │
                                │ group       │
                                └─────────────┘
                                      │
                                      │ 1:N
                                      ▼
                                ┌─────────────┐
                                │ MATCHTEAMS  │
                                ├─────────────┤
                                │ id          │
                                │ matchId     │
                                │ slot        │
                                │ teamId      │
                                │ source      │
                                └─────────────┘
                                      ▲
                                      │ N:1
                                      │ 
                                ┌─────────────┐
                                │   MATCHES   │
                                ├─────────────┤
                                │ id          │
                                │ round       │
                                │ groupCode   │
                                │ matchNumber │
                                │ matchTime   │
                                │ matchDate   │
                                │ status      │
                                │ homeScore   │
                                │ awayScore   │
                                └─────────────┘

TEAMS ◄─────────── N:M ───────────► MATCHES
                    │
                    │
                MATCHTEAMS
                  (bridge)
