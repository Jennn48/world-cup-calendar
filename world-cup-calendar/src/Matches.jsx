import CardMatch from "./CardMatch.jsx";
import { useState } from "react";

function Matches(props) {
  return (
    <>
      <section className="matches">
        <div className="title">
          <h2>Partidos fase de grupos</h2>
        </div>
        {props.matches.map((match, index) => {
          return (
            <>
              <CardMatch
                key={index}
                id={index}
                group={match.grupo}
                localName={match.local}
                awayName={match.visitante}
                localScore={match.localScore}
                awayScore={match.visitanteScore}
                date={match.fecha}
                hour={match.hora}
                setMatches={props.setMatches}
              />
            </>
          );
        })}
        <div className="title">
          <h2>Partidos dieciseavos de final</h2>
        </div>
        {Object.values(props.matchesPlayOff.round16).map((match, index) => {          
          return (
            <>
              <CardMatch
                key={index + 71}
                id={index + 71}
                group={match.grupo}
                localName={match.local}
                awayName={match.visitante}
                localScore={match.localScore}
                awayScore={match.visitanteScore}
                date={match.fecha}
                hour={match.hora}
                setMatches={props.setMatchesPlayOff}
              />
            </>
          );
        })}
        <div className="title">
          <h2>Partidos Octavos de final</h2>
        </div>
        {Object.values(props.matchesPlayOff.round8).map((match, index) => {          
          return (
            <>
              <CardMatch
                key={index + 87}
                id={index + 87}
                group={match.grupo}
                localName={match.local}
                awayName={match.visitante}
                localScore={match.localScore}
                awayScore={match.visitanteScore}
                date={match.fecha}
                hour={match.hora}
                setMatches={props.setMatchesPlayOff}
              />
            </>
          );
        })}

        <div className="title">
          <h2>Partidos Cuartos de final</h2>
        </div>
        {Object.values(props.matchesPlayOff.quarter).map((match, index) => {          
          return (
            <>
              <CardMatch
                key={index + 95}
                id={index + 95}
                group={match.grupo}
                localName={match.local}
                awayName={match.visitante}
                localScore={match.localScore}
                awayScore={match.visitanteScore}
                date={match.fecha}
                hour={match.hora}
                setMatches={props.setMatchesPlayOff}
              />
            </>
          );
        })}

        <div className="title">
          <h2>Partidos Semifinal</h2>
        </div>
        {Object.values(props.matchesPlayOff.semi).map((match, index) => {          
          return (
            <>
              <CardMatch
                key={index + 99}
                id={index + 99}
                group={match.grupo}
                localName={match.local}
                awayName={match.visitante}
                localScore={match.localScore}
                awayScore={match.visitanteScore}
                date={match.fecha}
                hour={match.hora}
                setMatches={props.setMatchesPlayOff}
              />
            </>
          );
        })}
      </section>
    </>
  );
}

export default Matches;
