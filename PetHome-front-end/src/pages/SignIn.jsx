import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const SignIn = ({ signInUser }) => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const success = await signInUser(form)

    if (success) {
      navigate("/")
    } else {
      alert("Invalid email or password")
    }
  }

  return (
    <section className="page-section">
      <div className="auth-box">
        <h1>Sign In</h1>

        <form onSubmit={handleSubmit} className="donation-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="main-btn">
            Sign In
          </button>
        </form>

        <p className="auth-text">
          Don&apos;t have an account? <Link to="/sign-up">Sign Up</Link>
        </p>
      </div>
    </section>
  )
}

export default SignIn
