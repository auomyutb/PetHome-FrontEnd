import team from "../data/team"

const Team = () => {
  return (
    <section className="page-section">
      <h1>Our Team</h1>
      <div className="team-grid">
        {team.map((member) => (
          <div key={member.id} className="team-card">
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Team
