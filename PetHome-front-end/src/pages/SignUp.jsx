import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const SignUp = ({ signUpUser }) => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const success = await signUpUser(form)

    if (success) {
      alert("Account created successfully")
      navigate("/sign-in")
    } else {
      alert("Sign up failed")
    }
  }

  return (
    <section className="page-section">
      <div className="auth-box">
        <h1>Sign Up</h1>

        <form onSubmit={handleSubmit} className="donation-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

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
            Create Account
          </button>
        </form>

        <p className="auth-text">
          Already have an account? <Link to="/sign-in">Sign In</Link>
        </p>
      </div>
    </section>
  )
}

export default SignUp
