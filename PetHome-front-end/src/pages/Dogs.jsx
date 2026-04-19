import PetCard from "../components/PetCard"

const Dogs = ({ dogs }) => {
  return (
    <section className="page-section">
      <h1>Our Rescue Dogs</h1>
      <div className="pets-grid">
        {dogs.map((dog) => (
          <PetCard key={dog._id} pet={dog} />
        ))}
      </div>
    </section>
  )
}

export default Dogs
