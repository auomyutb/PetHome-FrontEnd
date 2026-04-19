import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Dogs from "./pages/Dogs"
import Cats from "./pages/Cats"
import Team from "./pages/Team"
import Donate from "./pages/Donate"
import ThankYou from "./pages/ThankYou"
import Admin from "./pages/Admin"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {
  const [pets, setPets] = useState([])
  const [dogs, setDogs] = useState([])
  const [cats, setCats] = useState([])
  const [donations, setDonations] = useState([])
  const [user, setUser] = useState(null)

  const fetchPets = async () => {
    try {
      const response = await axios.get("http://localhost:3000/pets")
      const allPets = response.data
      setPets(allPets)
      setDogs(allPets.filter((pet) => pet.type === "dog"))
      setCats(allPets.filter((pet) => pet.type === "cat"))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchDonations = async () => {
    try {
      const response = await axios.get("http://localhost:3000/donations")
      setDonations(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPets()
    fetchDonations()

    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const addDonation = async (formData) => {
    try {
      await axios.post("http://localhost:3000/donations", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      fetchDonations()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const addPet = async (petData) => {
    try {
      const token = localStorage.getItem("token")

      await axios.post("http://localhost:3000/pets", petData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      fetchPets()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const signUpUser = async (formData) => {
    try {
      await axios.post("http://localhost:3000/auth/sign-up", formData)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const signInUser = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/sign-in",
        formData
      )

      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      setUser(response.data.user)

      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const signOutUser = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <div className="app">
      <Header user={user} signOutUser={signOutUser} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dogs" element={<Dogs dogs={dogs} />} />
        <Route path="/cats" element={<Cats cats={cats} />} />
        <Route path="/team" element={<Team />} />
        <Route path="/donate" element={<Donate addDonation={addDonation} />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/sign-up" element={<SignUp signUpUser={signUpUser} />} />
        <Route path="/sign-in" element={<SignIn signInUser={signInUser} />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user}>
              <Admin pets={pets} donations={donations} addPet={addPet} />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
