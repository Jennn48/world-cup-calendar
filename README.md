# FIFA World Cup 2026 Calendar

Web application for organizing the **FIFA World Cup 2026** tournament, including the group stage, standings, match results, and knockout-stage bracket.

The application dynamically determines knockout-stage participants based on previous match results and tournament qualification rules.

## Why this project?

This project was created to better understand FIFA's system for determining the knockout-stage matchups based on the results of the group stage.

The system is particularly complex because the allocation of third-placed teams depends on which groups provide the eight best third-placed teams. This creates 495 possible combinations and can significantly affect the knockout bracket.

The application makes these rules easier to understand by visualizing how group-stage results can influence the knockout-stage bracket. In some cases, the outcome of a single group-stage match can determine which side of the bracket a team ultimately enters.

Hopefully, FIFA will eventually adopt a simpler and more transparent qualification system, in which case this application will become obsolete. If the current system remains in place, however, the same approach could once again be useful for the 2030 World Cup.

## Features

- 📅 World Cup match schedule.
- 🏆 Group-stage standings.
- 🥇 Automatic qualification of teams from the group stage.
- 🔀 Dynamic knockout-stage bracket.
- ⚛️ Component-based React architecture.

---

## Tech Stack

### Frontend

- **JavaScript (ES6+)**
- **React**
- **HTML5**
- **CSS3**

### Development Tools

- **Vite**

---

## Getting Started

### Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd world-cup-calendar-react
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```
---

## Project Structure

The project is organized into React components, tournament data, and reusable utility functions.

```text
──src
    │   main.jsx
    ├───components
    │   ├───Brackets
    │   ├───Groups
    │   ├───Header
    │   └───Matches
    ├───container
    │       App.css
    │       App.jsx
    ├───data
    │       groups.js
    │       index.js
    │       matches.js
    │       matchTeams.js
    │       teams.js
    └───utils
            anexoC.js
            auxiliaryFunctions.js
            bracket.js
            classificationFc.js
            standings.js
```

# Dynamic Knockout Resolution

One of the main technical challenges of this project is determining the participants of knockout-stage matches dynamically, allowing the application to show how each match takes shape as the tournament progresses.

When a match participant depends on an event that has not yet been determined — such as a team's position in the group stage or the result of a previous match — this dependency is represented by a **source**.

For example source can be:

```text
1A
third
W101
```

These sources represent:

| Source | Meaning |
|---|---|
| `1A` | First-place team from Group A |
| `third` | Some third-placed team determined by one of the possible qualification combinations|
| `W101` | Winner of match M101 |

---

# Third-Place Teams

The World Cup knockout stage introduces additional logic for teams finishing third in their groups.

The Round of 32 matchups depend on exactly which eight groups qualify their third-placed teams. FIFA has an official fixed table of combinations to prevent favoritism and ensure that the opponents of the group winners come from predetermined matchups, this table has 495 combinations and is defined in this FIFA regulations article: [Official FIFA World Cup 2026 Regulations](https://www.cope.es/uploads/files/2026/07/16/FWC26_regulations_ES.pdf).

The application therefore needs to:

1. Calculate the third-place teams.
2. Compare their results.
3. Determine the eight qualifying teams.
4. Identify the groups represented by those teams.
5. Sort the qualifying groups alphabetically.
6. Determine the corresponding FIFA-defined combination.
7. Assign the qualified third-placed teams to the correct Round of 32 matches according to that cobination.

This is one of the main reasons why the knockout-stage logic is more complex than simply assigning fixed teams to matches. The application must first determine all eight qualified third-placed teams before it can resolve the Round of 32 matchups.

---

# Group Standings

The application calculates group standings based on match results.

The main statistics include:

| Statistic | Description |
|---|---|
| PJ | Matches played |
| GF | Goals scored |
| GC | Goals conceded |
| DG | Goal difference |
| Pts | Points |

The points system is:

```text
Win   → 3 points
Draw  → 1 point
Loss  → 0 points
```

Goal difference is calculated as:

```text
DG = GF - GC
```

The standings are recalculated every time match results change.

---

# Match Result Flow

The general data flow is:

```text
Match Result
     ↓
Group Standings
     ↓
Qualified Teams
     ↓
FIFA Combination
     ↓
Knockout Sources
     ↓
Resolved Teams
     ↓
Knockout Matches (if Defined)
```

This means that every time a match score is changed, all matches are recalculated and displayed if the application is able to determine both participants.
---

# Example of Dynamic Sources

A match can contain references to teams whose identities are not known yet:

```js
{
  home: "W101",
  away: "W102"
}
```

The application resolves these sources by looking at the corresponding previous matches.

Conceptually:

```text
W101
 ↓
Match 101
 ↓
Winner
 ↓
Team
```
---

# License

This project is intended for unnecessarily overthinking purposes only.