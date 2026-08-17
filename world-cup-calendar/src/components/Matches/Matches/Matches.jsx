import CardMatch from "../CardMatch/CardMatch.jsx";
import "./style.css";
import {
  getMatchTeams,
  getTeamById,
} from "../../../utils/auxiliaryFunctions.js";

function Matches(props) {
  return (
    <>
      <section className="matches">
        <div className="title">
          <h2>Partidos fase de grupos</h2>
        </div>
        {props.matches.map((match, index) => {
          let teamSlots = getMatchTeams(match, props.matchTeams, props.teams);

          if (match.round !== "GROUP_STAGE") return null;
          return (
            <>
              <CardMatch
                key={match.id}
                id={match.id}
                group={match.gruopCode}
                localName={teamSlots.home.team.name}
                awayName={teamSlots.away.team.name}
                homeFlag={teamSlots.home.team.flagUrl}
                awayFlag={teamSlots.away.team.flagUrl}
                localScore={match.homeScore}
                awayScore={match.awayScore}
                date={match.matchDate}
                hour={match.matchTime}
                updateMatchScore={props.updateMatchScore}
              />
            </>
          );
        })}
        <div className="title">
          <h2>Partidos dieciseavos de final</h2>
        </div>
        {Object.values(
          props.matches.filter((m) => m.round === "ROUND_OF_32"),
        ).map((match, index) => {
          let teamSlotsId = getMatchTeams(match, props.matchTeams, props.teams);
          let teamSlots = {
            home: getTeamById(props.teams, teamSlotsId.home.teamId),
            away: getTeamById(props.teams, teamSlotsId.away.teamId),
          };
          
          if (Object.values(teamSlotsId).some((t) => t.teamId === null)) {
            return null;
          }

          return (
            <>
              <CardMatch
                key={match.id}
                id={match.id}
                group={match.round}
                localName={teamSlots.home.name}
                awayName={teamSlots.away.name}
                homeFlag={teamSlots.home.flagUrl}
                awayFlag={teamSlots.away.flagUrl}
                localScore={match.homeScore}
                awayScore={match.awayScore}
                date={match.matchDate}
                hour={match.matchTime}
                updateMatchScore={props.updateMatchScore}
              />
            </>
          );
        })}
        <div className="title">
          <h2>Partidos Octavos de final</h2>
        </div>
        {Object.values(
          props.matches.filter((m) => m.round === "ROUND_OF_16"),
        ).map((match, index) => {
          let teamSlotsId = getMatchTeams(match, props.matchTeams, props.teams);
          
          
          let teamSlots = {
            home: getTeamById(props.teams, teamSlotsId.home.teamId),
            away: getTeamById(props.teams, teamSlotsId.away.teamId),
          };
          
          if (Object.values(teamSlotsId).some((t) => t.teamId === null)) {
            return null;
          }

          return (
            <>
              <CardMatch
                key={match.id}
                id={match.id}
                group={match.gruopCode}
                localName={teamSlots.home.name}
                awayName={teamSlots.away.name}
                homeFlag={teamSlots.home.flagUrl}
                awayFlag={teamSlots.away.flagUrl}
                localScore={match.homeScore}
                awayScore={match.awayScore}
                date={match.matchDate}
                hour={match.matchTime}
                updateMatchScore={props.updateMatchScore}
              />
            </>
          );
        })}

        <div className="title">
          <h2>Partidos Cuartos de final</h2>
        </div>
        {Object.values(
          props.matches.filter((m) => m.round === "QUARTERFINAL"),
        ).map((match, index) => {
          let teamSlotsId = getMatchTeams(match, props.matchTeams, props.teams);
          let teamSlots = {
            home: getTeamById(props.teams, teamSlotsId.home.teamId),
            away: getTeamById(props.teams, teamSlotsId.away.teamId),
          };
          if (Object.values(teamSlotsId).some((t) => t.teamId === null)) {
            return null;
          }

          return (
            <>
              <CardMatch
                key={match.id}
                id={match.id}
                group={match.gruopCode}
                localName={teamSlots.home.name}
                awayName={teamSlots.away.name}
                homeFlag={teamSlots.home.flagUrl}
                awayFlag={teamSlots.away.flagUrl}
                localScore={match.homeScore}
                awayScore={match.awayScore}
                date={match.matchDate}
                hour={match.matchTime}
                updateMatchScore={props.updateMatchScore}
              />
            </>
          );
        })}

        <div className="title">
          <h2>Partidos Semifinal</h2>
        </div>
        {Object.values(
          props.matches.filter((m) => m.round === "SEMIFINAL"),
        ).map((match, index) => {
          let teamSlotsId = getMatchTeams(match, props.matchTeams, props.teams);
          let teamSlots = {
            home: getTeamById(props.teams, teamSlotsId.home.teamId),
            away: getTeamById(props.teams, teamSlotsId.away.teamId),
          };
          if (Object.values(teamSlotsId).some((t) => t.teamId === null)) {
            return null;
          }

          return (
            <>
              <CardMatch
                key={match.id}
                id={match.id}
                group={match.gruopCode}
                localName={teamSlots.home.name}
                awayName={teamSlots.away.name}
                homeFlag={teamSlots.home.flagUrl}
                awayFlag={teamSlots.away.flagUrl}
                localScore={match.homeScore}
                awayScore={match.awayScore}
                date={match.matchDate}
                hour={match.matchTime}
                updateMatchScore={props.updateMatchScore}
              />
            </>
          );
        })}

        <div className="title">
          <h2>Partido Final</h2>
        </div>
        {Object.values(props.matches.filter((m) => m.round === "FINAL")).map(
          (match, index) => {
            let teamSlotsId = getMatchTeams(match, props.matchTeams, props.teams);
            let teamSlots = {
              home: getTeamById(props.teams, teamSlotsId.home.teamId),
              away: getTeamById(props.teams, teamSlotsId.away.teamId),
            };
            if (Object.values(teamSlotsId).some((t) => t.teamId === null)) {
              return null;
            }

            return (
              <>
                <CardMatch
                  key={match.id}
                  id={match.id}
                  group={match.gruopCode}
                  localName={teamSlots.home.name}
                  awayName={teamSlots.away.name}
                  homeFlag={teamSlots.home.flagUrl}
                  awayFlag={teamSlots.away.flagUrl}
                  localScore={match.homeScore}
                  awayScore={match.awayScore}
                  date={match.matchDate}
                  hour={match.matchTime}
                  updateMatchScore={props.updateMatchScore}
                />
              </>
            );
          },
        )}
      </section>
    </>
  );
}

export default Matches;
