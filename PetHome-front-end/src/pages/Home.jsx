import Hero from "../components/Hero"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
      <Hero />

      <section className="home-section">
        <h2>Find Your New Best Friend</h2>
        <p>Browse our rescue animals and help us give them a better future.</p>

        <div className="home-cards">
          <div className="info-card">
            <h3>Adopt a Dog</h3>
            <p>Meet our lovely rescue dogs looking for a forever home.</p>
            <Link to="/dogs" className="secondary-btn">
              View Dogs
            </Link>
          </div>

          <div className="info-card">
            <h3>Adopt a Cat</h3>
            <p>See our rescue cats and help them find a safe family.</p>
            <Link to="/cats" className="secondary-btn">
              View Cats
            </Link>
          </div>

          <div className="info-card">
            <h3>Make a Donation</h3>
            <p>Your support helps with food, treatment, and shelter care.</p>
            <Link to="/donate" className="secondary-btn">
              Donate Now
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
