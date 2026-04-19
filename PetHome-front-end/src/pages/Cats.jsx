import PetCard from "../components/PetCard"

const Cats = ({ cats }) => {
  return (
    <section className="page-section">
      <h1>Our Rescue Cats</h1>
      <div className="pets-grid">
        {cats.map((cat) => (
          <PetCard key={cat._id} pet={cat} />
        ))}
      </div>
    </section>
  )
}

export default Cats
