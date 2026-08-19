# FIFA World Cup 2026 Application — Function Documentation

This document provides JSDoc-style documentation in English for the named
functions currently present in the `src/` directory of the project.

The application is a React-based FIFA World Cup 2026 simulator. It calculates
group standings, resolves qualified teams and third-place combinations,
determines knockout-stage participants, and renders matches and the knockout
bracket.

> **Note:** The source code currently uses several implicit object structures
> rather than TypeScript interfaces. The JSDoc types below describe the
> structures used by the current implementation and are intended to make the
> code easier to understand and maintain.

---

## Common data structures

```js
/**
 * A team participating in the tournament.
 *
 * @typedef {Object} Team
 * @property {number} id - Unique team identifier.
 * @property {string} name - Team name.
 * @property {string} flagUrl - URL of the team's flag.
 * @property {string} code - Team code.
 * @property {string} group - Group code, such as "A" or "B".
 */

/**
 * A World Cup group.
 *
 * @typedef {Object} Group
 * @property {string} code - Group identifier.
 */

/**
 * A tournament match.
 *
 * @typedef {Object} Match
 * @property {number} id - Unique match identifier.
 * @property {string|null} groupCode - Group identifier for group-stage matches.
 * @property {string} round - Tournament round.
 * @property {string} matchDate - Match date.
 * @property {string} matchTime - Match time.
 * @property {number|null} homeScore - Home team score.
 * @property {number|null} awayScore - Away team score.
 */

/**
 * Relationship between a match and one of its participant slots.
 *
 * @typedef {Object} MatchTeam
 * @property {number} matchId - Identifier of the related match.
 * @property {"home"|"away"} slot - Participant position in the match.
 * @property {number|null} teamId - Resolved team identifier, if available.
 * @property {string|null} source - Source used to determine the participant,
 * such as "1A", "2B", "3C", "W73", or "third".
 */

/**
 * A team row in the standings table.
 *
 * @typedef {Object} Standing
 * @property {number} id - Team identifier.
 * @property {string} name - Team name.
 * @property {string} flag - Team flag URL.
 * @property {number} pj - Matches played.
 * @property {number} gf - Goals for.
 * @property {number} gc - Goals against.
 * @property {number} dg - Goal difference.
 * @property {number} p - Matches lost.
 * @property {number} g - Matches won.
 * @property {number} e - Draws.
 * @property {number} ptos - Points.
 */

/**
 * A resolved match prepared for bracket rendering.
 *
 * @typedef {Object} BracketMatch
 * @property {Match} match - Match information.
 * @property {Team|undefined} homeTeam - Home team, when resolved.
 * @property {Team|undefined} awayTeam - Away team, when resolved.
 */
```

---

# Utility functions

## `src/utils/auxiliaryFunctions.js`

### `getTeamById`

```js
/**
 * Finds a team by its unique identifier.
 *
 * @param {Team[]} teams - Array containing all tournament teams.
 * @param {number} id - Identifier of the team to find.
 * @returns {Team|undefined} The matching team, or undefined when no team exists
 * with the specified identifier.
 */
export function getTeamById(teams, id) {
  return teams.find((team) => team.id === id);
}
```

### `getTeamsByGroup`

```js
/**
 * Returns all teams belonging to a specific group.
 *
 * @param {Team[]} teams - Array containing all tournament teams.
 * @param {string} group - Group code to filter by, for example "A".
 * @returns {Team[]} Teams belonging to the requested group.
 */
export function getTeamsByGroup(teams, group) {
  return teams.filter((team) => team.group === group);
}
```

### `getMatchTeams`

```js
/**
 * Resolves the participants associated with a match.
 *
 * For group-stage matches, the function resolves the participant team objects
 * directly from their team IDs. For knockout matches, the function preserves
 * the participant source because the team may depend on the result of another
 * match or on a group ranking.
 *
 * @param {Match} match - Match whose participants must be resolved.
 * @param {MatchTeam[]} matchTeams - Participant/source relationships for all matches.
 * @param {Team[]} teams - Array containing all tournament teams.
 * @returns {{
 *   home: {
 *     source: string|null,
 *     teamId: number|null,
 *     team: Team|undefined|null
 *   },
 *   away: {
 *     source: string|null,
 *     teamId: number|null,
 *     team: Team|undefined|null
 *   }
 * }} The home and away participant information.
 */
export function getMatchTeams(match, matchTeams, teams) {
  // Current implementation.
}
```

### `getTeamBySource`

```js
/**
 * Resolves a team from a tournament source identifier.
 *
 * Supported source formats include:
 * - "W101": winner of match 101.
 * - "1A": first-place team from group A.
 * - "2A": second-place team from group A.
 * - "3A": third-place team from group A.
 * - "third": an unresolved third-place participant that must be mapped
 *   according to the FIFA third-place allocation rules.
 *
 * @param {string} source - Source identifier used to determine a team.
 * @param {Team[]} teams - Array containing all tournament teams.
 * @param {Standing[]} tableData - Current standings.
 * @param {Match[]} matches - All tournament matches.
 * @param {MatchTeam[]} matchTeams - Participant/source relationships for matches.
 * @returns {Team|null|undefined} The resolved team, or null/undefined when the
 * participant cannot yet be determined.
 */
export function getTeamBySource(
  source,
  teams,
  tableData,
  matches,
  matchTeams,
) {
  // Current implementation.
}
```

### `calculatePosition`

```js
/**
 * Calculates the current ranking order of a group.
 *
 * The function obtains the standings for the supplied group teams and then
 * sorts them using the tournament ranking criteria implemented by
 * {@link sortTeams}.
 *
 * @param {Team[]} group - Teams belonging to one group.
 * @param {Standing[]} tableData - Current tournament standings.
 * @returns {Standing[]} The group standings ordered from first to last.
 */
export function calculatePosition(group, tableData) {
  // Current implementation.
}
```

### `sortTeams`

```js
/**
 * Sorts teams according to the current tournament ranking criteria.
 *
 * Teams are ordered by:
 * 1. Points, descending.
 * 2. Goal difference, descending.
 * 3. Goals scored, descending.
 * 4. Team name, alphabetically, as the final tie-breaker.
 *
 * @param {Standing[]} teams - Standings to sort.
 * @returns {Standing[]} A new sorted array.
 */
export function sortTeams(teams) {
  // Current implementation.
}
```

---

# Bracket utilities

## `src/utils/bracket.js`

### `getBracketData`

```js
/**
 * Builds the data structure required to render the knockout bracket.
 *
 * Each match is combined with its currently resolved home and away teams.
 * This keeps the bracket components focused on presentation rather than
 * participant-resolution logic.
 *
 * @param {Match[]} matches - Matches belonging to a knockout round.
 * @param {MatchTeam[]} matchTeams - Participant/source relationships.
 * @param {Team[]} teams - Array containing all tournament teams.
 * @returns {BracketMatch[]} Matches enriched with their resolved teams.
 */
function getBracketData(matches, matchTeams, teams) {
  // Current implementation.
}
```

---

# Knockout classification

## `src/utils/classificationFc.js`

### `getThirdPlace`

```js
/**
 * Retrieves the third-placed team from every group.
 *
 * Each group's third-placed team is resolved through its source identifier
 * (for example, "3A"), and the corresponding standings row is returned.
 *
 * @param {Team[]} teams - Array containing all tournament teams.
 * @param {Standing[]} table - Current group standings.
 * @param {Match[]} matches - All tournament matches.
 * @param {MatchTeam[]} resolvedMatchTeams - Current participant/source relationships.
 * @param {Group[]} groups - Tournament groups.
 * @returns {(Standing|undefined)[]} Third-place standings from all groups.
 */
function getThirdPlace(
  teams,
  table,
  matches,
  resolvedMatchTeams,
  groups,
) {
  // Current implementation.
}
```

### `getKeyAnexoCSorted`

```js
/**
 * Creates the FIFA third-place allocation key used by Annex C.
 *
 * The function extracts the group code of every qualified third-place team,
 * concatenates those codes, and sorts them alphabetically. The resulting key
 * is used to select the correct third-place knockout pairing configuration
 * from the `anexoC` mapping.
 *
 * @param {Standing[]} terceros - Qualified third-place teams.
 * @param {Team[]} teams - Array containing all tournament teams.
 * @returns {string} Sorted group-code key used by the Annex C mapping.
 */
function getKeyAnexoCSorted(terceros, teams) {
  // Current implementation.
}
```

### `resolveMatchTeams`

```js
/**
 * Resolves all currently determinable knockout participants.
 *
 * The function:
 * 1. Determines the third-place team from every group.
 * 2. Selects the eight best third-place teams.
 * 3. Builds the Annex C key from their group codes.
 * 4. Looks up the official third-place pairing configuration.
 * 5. Resolves sources such as "1A", "2B", "3C", and "W73".
 * 6. Replaces resolvable source relationships with their team IDs.
 *
 * This function is central to the knockout-stage classification because
 * third-place pairings cannot be represented by a single static source:
 * their destinations depend on which eight groups provide the best
 * third-placed teams.
 *
 * @param {Standing[]} table - Current group standings.
 * @param {Group[]} groups - Tournament groups.
 * @param {Team[]} teams - Array containing all tournament teams.
 * @param {Match[]} matches - All tournament matches.
 * @param {MatchTeam[]} matchTeams - Original participant/source relationships.
 * @returns {MatchTeam[]} A copied and partially resolved set of match/team
 * relationships.
 */
function resolveMatchTeams(
  table,
  groups,
  teams,
  matches,
  matchTeams,
) {
  // Current implementation.
}
```

---

# Standings

## `src/utils/standings.js`

### `calculateStandings`

```js
/**
 * Calculates the group-stage standings for every team.
 *
 * The function creates an initial standings row for every team and processes
 * all played group-stage matches. It calculates matches played, goals for,
 * goals against, goal difference, wins, draws, losses, and points.
 *
 * A match is considered unplayed when both scores are null.
 *
 * @param {Match[]} matches - Group-stage matches.
 * @param {Group[]} groups - Tournament groups.
 * @param {Team[]} teams - Array containing all tournament teams.
 * @param {MatchTeam[]} matchTeams - Relationships between matches and teams.
 * @returns {Standing[]} Current standings for all group-stage teams.
 */
function calculateStandings(matches, groups, teams, matchTeams) {
  // Current implementation.
}
```

---

# Main React application

## `src/container/App.jsx`

### `App`

```jsx
/**
 * Root application component.
 *
 * Maintains the current application view and match scores, calculates group
 * standings, resolves knockout participants, builds bracket data, and renders
 * the selected section of the application.
 *
 * @returns {JSX.Element} The complete World Cup application interface.
 */
function App() {
  // Current implementation.
}
```

### `togglePosition`

```js
/**
 * Changes the currently selected application section.
 *
 * @param {"groups"|"matches"|"keys"} position - View to display.
 * @returns {void}
 */
function togglePosition(position) {
  // Current implementation.
}
```

### `updateMatchScore`

```js
/**
 * Updates the score of one team in a specific match.
 *
 * The function updates the React match state immutably and changes only the
 * requested score property.
 *
 * @param {number} matchId - Identifier of the match to update.
 * @param {"home"|"away"} slot - Team slot whose score must be changed.
 * @param {number} score - New score.
 * @returns {void}
 */
function updateMatchScore(matchId, slot, score) {
  // Current implementation.
}
```

---

# Header components

## `src/components/Header/Header/Header.jsx`

### `Header`

```jsx
/**
 * Renders the application's main navigation header.
 *
 * @returns {JSX.Element} Navigation links for the application sections.
 */
function Header() {
  // Current implementation.
}
```

---

## `src/components/Header/Hero/Hero.jsx`

### `Hero`

```jsx
/**
 * Renders the application's World Cup hero section.
 *
 * @returns {JSX.Element} The title and World Cup image.
 */
function Hero() {
  // Current implementation.
}
```

---

## `src/components/Header/Toggle/Toggle.jsx`

### `Toggle`

```jsx
/**
 * Renders the view-selection control used to switch between groups,
 * matches, and the knockout bracket.
 *
 * @param {{onToggle: function(string): void}} props - Component properties.
 * @returns {JSX.Element} The view toggle control.
 */
function Toggle(props) {
  // Current implementation.
}
```

### `handleClick`

```js
/**
 * Handles clicks on the view-selection buttons.
 *
 * It updates the visual position of the toggle indicator and notifies the
 * parent component about the selected view.
 *
 * @param {MouseEvent} e - Browser click event.
 * @returns {void}
 */
function handleClick(e) {
  // Current implementation.
}
```

---

# Group-stage components

## `src/components/Groups/Groups/Groups.jsx`

### `Groups`

```jsx
/**
 * Renders all group standings tables.
 *
 * @param {{
 *   groups: Array<{
 *     grupo: string,
 *     equipos: Standing[]
 *   }>,
 *   table: Standing[]
 * }} props - Group and standings data.
 * @returns {JSX.Element} The complete group-stage standings section.
 */
function Groups(props) {
  // Current implementation.
}
```

---

## `src/components/Groups/Table/Table.jsx`

### `Table`

```jsx
/**
 * Renders a standings table for one group.
 *
 * @param {{
 *   grupo: string,
 *   equipos: Standing[]
 * }} props - Group identifier and ordered team standings.
 * @returns {JSX.Element} A group standings table.
 */
function Table(props) {
  // Current implementation.
}
```

---

## `src/components/Groups/Team/Team.jsx`

### `Team`

```jsx
/**
 * Renders one team row inside a group standings table.
 *
 * @param {{
 *   position: number,
 *   name: string,
 *   flag: string,
 *   pj: number,
 *   g: number,
 *   e: number,
 *   p: number,
 *   ptos: number,
 *   gf: number,
 *   gc: number,
 *   dg: number
 * }} props - Team standings information.
 * @returns {JSX.Element} A table row representing the team.
 */
function Team(props) {
  // Current implementation.
}
```

---

# Match components

## `src/components/Matches/Matches/Matches.jsx`

### `Matches`

```jsx
/**
 * Renders tournament matches grouped by competition round.
 *
 * The component uses a fixed round configuration to determine section titles
 * and filters the supplied match list for each round. Empty rounds are omitted.
 *
 * @param {{
 *   matches: Match[],
 *   matchTeams: MatchTeam[],
 *   teams: Team[],
 *   updateMatchScore: function(number, string, number): void
 * }} props - Match data and score-update callback.
 * @returns {JSX.Element} The matches section grouped by round.
 */
function Matches(props) {
  // Current implementation.
}
```

---

## `src/components/Matches/Matches/MatchItem.jsx`

### `MatchItem`

```jsx
/**
 * Renders all ready-to-display matches belonging to one competition round.
 *
 * A match is considered ready when both its home and away teams can be
 * resolved. This prevents knockout matches with unresolved participants from
 * being displayed prematurely.
 *
 * @param {{
 *   matches: Match[],
 *   title: string,
 *   matchTeams: MatchTeam[],
 *   teams: Team[],
 *   updateMatchScore: function(number, string, number): void
 * }} props - Match data, resolution data, and rendering configuration.
 * @returns {JSX.Element|null} The round section, or null when no match is ready.
 */
function MatchItem(props) {
  // Current implementation.
}
```

---

## `src/components/Matches/CardMatch/CardMatch.jsx`

### `CardMatch`

```jsx
/**
 * Renders an individual match card with both teams, scores, and match date.
 *
 * The component delegates score updates to the parent through
 * `updateMatchScore`.
 *
 * @param {{
 *   match: Match,
 *   homeTeam: Team,
 *   awayTeam: Team,
 *   updateMatchScore: function(number, string, number): void
 * }} props - Match and participant information.
 * @returns {JSX.Element} A match card.
 */
function CardMatch(props) {
  // Current implementation.
}
```

### `setHomeScore`

```js
/**
 * Sends a new home-team score to the parent component.
 *
 * @param {number} score - New home-team score.
 * @returns {void}
 */
function setHomeScore(score) {
  // Current implementation.
}
```

### `setAwayScore`

```js
/**
 * Sends a new away-team score to the parent component.
 *
 * @param {number} score - New away-team score.
 * @returns {void}
 */
function setAwayScore(score) {
  // Current implementation.
}
```

---

## `src/components/Matches/TeamCard/TeamCard.jsx`

### `TeamCard`

```jsx
/**
 * Renders one team participating in a match and allows its score to be edited.
 *
 * The component keeps the editing state and current score locally. When the
 * score input loses focus, the value is sent to the parent callback.
 *
 * @param {{
 *   name: string,
 *   flagSrc: string,
 *   score: number|null,
 *   addScore: function(number): void,
 *   className?: string
 * }} props - Team information and score callback.
 * @returns {JSX.Element} Editable team match card.
 */
function TeamCard(props) {
  // Current implementation.
}
```

### `sendScore`

```js
/**
 * Stops score editing and sends the current score to the parent component.
 *
 * @returns {void}
 */
function sendScore() {
  // Current implementation.
}
```

---

## `src/components/Matches/Date/Date.jsx`

### `Date`

```jsx
/**
 * Renders the date and time of a match.
 *
 * @param {{date: string, hour: string}} props - Match date and time.
 * @returns {JSX.Element} Date and time display.
 */
function Date(props) {
  // Current implementation.
}
```

---

# Knockout bracket components

## `src/components/Brackets/Keys/Keys.jsx`

### `Keys`

```jsx
/**
 * Renders the complete knockout-stage bracket.
 *
 * The bracket is divided into left, center, and right sections. Match data is
 * split between the two sides so that the visual bracket can be displayed
 * symmetrically around the final.
 *
 * @param {{
 *   matches: {
 *     round16: BracketMatch[],
 *     round8: BracketMatch[],
 *     quarter: BracketMatch[],
 *     semi: BracketMatch[],
 *     final: BracketMatch[]
 *   }
 * }} props - Complete knockout bracket data.
 * @returns {JSX.Element} The knockout-stage bracket.
 */
function Keys(props) {
  // Current implementation.
}
```

---

## `src/components/Brackets/LeftBracket/LeftBracket.jsx`

### `LeftBracket`

```jsx
/**
 * Renders the left half of the knockout bracket.
 *
 * @param {{
 *   r16: BracketMatch[],
 *   r8: BracketMatch[],
 *   quarter: BracketMatch[],
 *   semi: BracketMatch[]
 * }} props - Match data for each left-side knockout round.
 * @returns {JSX.Element} Left bracket.
 */
function LeftBracket(props) {
  // Current implementation.
}
```

---

## `src/components/Brackets/RightBracket/RightBracket.jsx`

### `RightBracket`

```jsx
/**
 * Renders the right half of the knockout bracket.
 *
 * @param {{
 *   r16: BracketMatch[],
 *   r8: BracketMatch[],
 *   quarter: BracketMatch[],
 *   semi: BracketMatch[]
 * }} props - Match data for each right-side knockout round.
 * @returns {JSX.Element} Right bracket.
 */
function RightBracket(props) {
  // Current implementation.
}
```

---

## `src/components/Brackets/Round16/Round16.jsx`

### `Round16`

```jsx
/**
 * Renders the round-of-32 matches in the visual bracket.
 *
 * Each match displays the flags of the currently resolved participants and
 * the scheduled match date.
 *
 * @param {{matches: BracketMatch[]}} props - Round-of-32 bracket matches.
 * @returns {JSX.Element} Round-of-32 bracket section.
 */
function Round16(props) {
  // Current implementation.
}
```

---

## `src/components/Brackets/Round8/Round8.jsx`

### `Round8`

```jsx
/**
 * Renders the round-of-16 matches in the visual bracket.
 *
 * @param {{matches: BracketMatch[]}} props - Round-of-16 bracket matches.
 * @returns {JSX.Element} Round-of-16 bracket section.
 */
function Round8(props) {
  // Current implementation.
}
```

---

## `src/components/Brackets/Quarter/Quarter.jsx`

### `Quarter`

```jsx
/**
 * Renders the quarter-final matches in the visual bracket.
 *
 * @param {{matches: BracketMatch[]}} props - Quarter-final bracket matches.
 * @returns {JSX.Element} Quarter-final bracket section.
 */
function Quarter(props) {
  // Current implementation.
}
```

---

## `src/components/Brackets/Semi/Semi.jsx`

### `Semi`

```jsx
/**
 * Renders the semi-final matches in the visual bracket.
 *
 * @param {{matches: BracketMatch[]}} props - Semi-final bracket matches.
 * @returns {JSX.Element} Semi-final bracket section.
 */
function Semi(props) {
  // Current implementation.
}
```

---

## `src/components/Brackets/CenterBracket/CenterBracket.jsx`

### `CenterBracket`

```jsx
/**
 * Renders the center of the knockout bracket containing the World Cup image
 * and the final match.
 *
 * @param {{final: BracketMatch}} props - Final match data.
 * @returns {JSX.Element} Center section of the bracket.
 */
function CenterBracket(props) {
  // Current implementation.
}
```

---

## `src/components/Brackets/Final/Final.jsx`

### `Final`

```jsx
/**
 * Renders the tournament final in the center of the knockout bracket.
 *
 * Missing team flags are replaced with a placeholder image until both
 * participants are resolved.
 *
 * @param {{matches: BracketMatch}} props - Final match data.
 * @returns {JSX.Element} Final match bracket entry.
 */
function Final(props) {
  // Current implementation.
}
```

---

## `src/components/Brackets/MatchBracket/MatchBracket.jsx`

### `MatchBracket`

```jsx
/**
 * Renders the visual representation of one bracket match.
 *
 * @param {{
 *   flagLocal: string,
 *   flagAway: string,
 *   date: string
 * }} props - Match flags and date.
 * @returns {JSX.Element} A compact bracket match representation.
 */
function MatchBracket(props) {
  // Current implementation.
}
```

---

# Function inventory

The current source tree contains the following named functions:

| File | Function |
|---|---|
| `src/utils/auxiliaryFunctions.js` | `getTeamById` |
| `src/utils/auxiliaryFunctions.js` | `getTeamsByGroup` |
| `src/utils/auxiliaryFunctions.js` | `getMatchTeams` |
| `src/utils/auxiliaryFunctions.js` | `getTeamBySource` |
| `src/utils/auxiliaryFunctions.js` | `calculatePosition` |
| `src/utils/auxiliaryFunctions.js` | `sortTeams` |
| `src/utils/bracket.js` | `getBracketData` |
| `src/utils/classificationFc.js` | `getThirdPlace` |
| `src/utils/classificationFc.js` | `getKeyAnexoCSorted` |
| `src/utils/classificationFc.js` | `resolveMatchTeams` |
| `src/utils/standings.js` | `calculateStandings` |
| `src/container/App.jsx` | `App` |
| `src/container/App.jsx` | `togglePosition` |
| `src/container/App.jsx` | `updateMatchScore` |
| `src/components/Header/Header/Header.jsx` | `Header` |
| `src/components/Header/Hero/Hero.jsx` | `Hero` |
| `src/components/Header/Toggle/Toggle.jsx` | `Toggle` |
| `src/components/Header/Toggle/Toggle.jsx` | `handleClick` |
| `src/components/Groups/Groups/Groups.jsx` | `Groups` |
| `src/components/Groups/Table/Table.jsx` | `Table` |
| `src/components/Groups/Team/Team.jsx` | `Team` |
| `src/components/Matches/Matches/Matches.jsx` | `Matches` |
| `src/components/Matches/Matches/MatchItem.jsx` | `MatchItem` |
| `src/components/Matches/CardMatch/CardMatch.jsx` | `CardMatch` |
| `src/components/Matches/CardMatch/CardMatch.jsx` | `setHomeScore` |
| `src/components/Matches/CardMatch/CardMatch.jsx` | `setAwayScore` |
| `src/components/Matches/Date/Date.jsx` | `Date` |
| `src/components/Matches/TeamCard/TeamCard.jsx` | `TeamCard` |
| `src/components/Matches/TeamCard/TeamCard.jsx` | `sendScore` |
| `src/components/Brackets/Keys/Keys.jsx` | `Keys` |
| `src/components/Brackets/LeftBracket/LeftBracket.jsx` | `LeftBracket` |
| `src/components/Brackets/RightBracket/RightBracket.jsx` | `RightBracket` |
| `src/components/Brackets/Round16/Round16.jsx` | `Round16` |
| `src/components/Brackets/Round8/Round8.jsx` | `Round8` |
| `src/components/Brackets/Quarter/Quarter.jsx` | `Quarter` |
| `src/components/Brackets/Semi/Semi.jsx` | `Semi` |
| `src/components/Brackets/CenterBracket/CenterBracket.jsx` | `CenterBracket` |
| `src/components/Brackets/Final/Final.jsx` | `Final` |
| `src/components/Brackets/MatchBracket/MatchBracket.jsx` | `MatchBracket` |

---

# Recommended documentation usage

The JSDoc blocks in this document can be copied directly above the
corresponding functions in the source files.

For example:

```js
/**
 * Finds a team by its unique identifier.
 *
 * @param {Team[]} teams - Array containing all tournament teams.
 * @param {number} id - Identifier of the team to find.
 * @returns {Team|undefined} The matching team, or undefined when no team exists
 * with the specified identifier.
 */
export function getTeamById(teams, id) {
  return teams.find((team) => team.id === id);
}
```

For a production codebase, the next useful improvement would be to move the
shared `@typedef` declarations into a dedicated JSDoc/types file or to migrate
the project to TypeScript. That would make the structures such as `Team`,
`Match`, `MatchTeam`, and `Standing` reusable throughout the application and
would allow editor tooling to validate the function parameters and return
values automatically.
