import { Link } from "react-router-dom"

const ThankYou = () => {
  return (
    <section className="thank-you-page">
      <div className="thank-you-box">
        <h1>Thank You For Your Support</h1>
        <p>Your donation form has been sent successfully.</p>
        <p>We really appreciate your help for our rescue animals.</p>
        <Link to="/" className="main-btn">
          Back To Home
        </Link>
      </div>
    </section>
  )
}

export default ThankYou
