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
import Products from "./pages/Products"
import CartPage from "./pages/CartPage"
           
const App = () => {
  const [pets, setPets] = useState([])
  const [dogs, setDogs] = useState([])
  const [cats, setCats] = useState([])
  const [donations, setDonations] = useState([])
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState(null)
  const [user, setUser] = useState(null)

  const getPets = async () => {
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

  const getDonations = async () => {
    try {
      const response = await axios.get("http://localhost:3000/donations")
      setDonations(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products")
      setProducts(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getCart = async (userId) => {
    try {
      if (!userId) return
      const response = await axios.get(`http://localhost:3000/cart/${userId}`)
      setCart(response.data)
    } catch (error) {
      console.log(error)
      setCart(null)
    }
  }

  useEffect(() => {
    getPets()
    getDonations()
    getProducts()

    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setUser(parsedUser)
      getCart(parsedUser.id || parsedUser._id)
    }
  }, [])

  const addDonation = async (formData) => {
    try {
      await axios.post("http://localhost:3000/donations", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      getDonations()
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
      getPets()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const updatePet = async (id, petData) => {
    try {
      const token = localStorage.getItem("token")
      await axios.put(`http://localhost:3000/pets/${id}`, petData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      getPets()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const deletePet = async (id) => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`http://localhost:3000/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      getPets()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const deleteDonation = async (id) => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`http://localhost:3000/donations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      getDonations()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const addProduct = async (productData) => {
    try {
      await axios.post("http://localhost:3000/products", productData)
      getProducts()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const updateProduct = async (id, productData) => {
    try {
      await axios.put(`http://localhost:3000/products/${id}`, productData)
      getProducts()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`)
      getProducts()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const addToCart = async (productId) => {
    try {
      if (!user) {
        alert("Please sign in first")
        return
      }

      const userId = user.id || user._id
      await axios.post("http://localhost:3000/cart/add", {
        user: userId,
        product: productId,
        quantity: 1, ///****
      })

      getCart(userId)
      // alert("Product added to cart")
    } catch (error) {
      console.log(error)
      alert("Error adding product to cart")
    }
  }

  const removeFromCart = async (productId) => {
    try {
      const userId = user.id || user._id
      await axios.post("http://localhost:3000/cart/remove", {
        user: userId,
        product: productId,
      })

      getCart(userId)
    } catch (error) {
      console.log(error)
      alert("Error removing product")
    }
  }

  const clearCart = async () => {
    try {
      const userId = user.id || user._id
      await axios.delete(`http://localhost:3000/cart/clear/${userId}`)
      setCart(null)
    } catch (error) {
      console.log(error)
      alert("Error clearing cart")
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
      getCart(response.data.user.id || response.data.user._id)
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
    setCart(null)
  }

  return (
    <div className="app">
      <Header user={user} signOutUser={signOutUser} cart={cart} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/dogs" element={<Dogs dogs={dogs} />} />
        <Route path="/cats" element={<Cats cats={cats} />} />
        <Route path="/team" element={<Team />} />
        <Route path="/donate" element={<Donate addDonation={addDonation} />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/sign-up" element={<SignUp signUpUser={signUpUser} />} />
        <Route path="/sign-in" element={<SignIn signInUser={signInUser} />} />
        <Route
          path="/products"
          element={<Products products={products} addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user}>
              <Admin
                pets={pets}
                donations={donations}
                products={products}
                addPet={addPet}
                updatePet={updatePet}
                deletePet={deletePet}
                deleteDonation={deleteDonation}
                addProduct={addProduct}
                updateProduct={updateProduct}
                deleteProduct={deleteProduct}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
