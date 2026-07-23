function Team(props) {
  return (
    <>
      {/* name: "Mexico", id: 1, position: 1, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 */}
      <tr>
        <td className="team">
          <p className="num">{props.position}</p>
          <p className="flag">
            <img src={props.flag} />
          </p>
          <p className="name">
            <span>{props.name}</span>
          </p>
        </td>
        <td>{props.pj}</td>
        <td>{props.g}</td>
        <td>{props.e}</td>
        <td>{props.p}</td>
        <td>
          <span>{props.ptos}</span>
        </td>
        <td>{props.gf}</td>
        <td>{props.gc}</td>
        <td>{props.dg}</td>
      </tr>
    </>
  );
}

export default Team;
