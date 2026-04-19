import { useState } from 'react'

const Admin = ({ pets, donations, addPet }) => {
  const [form, setForm] = useState({
    name: '',
    type: 'dog',
    breed: '',
    age: '',
    description: '',
    image: ''
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const success = await addPet(form)

    if (success) {
      alert('Pet added successfully')
      setForm({
        name: '',
        type: 'dog',
        breed: '',
        age: '',
        description: '',
        image: ''
      })
    } else {
      alert('Error adding pet')
    }

    setLoading(false)
  }

  return (
    <section className='page-section'>
      <h1>Admin Page</h1>

      <div className='admin-form-box'>
        <h2>Add New Pet</h2>

        <form onSubmit={handleSubmit} className='donation-form'>
          <input
            type='text'
            name='name'
            placeholder='Pet Name'
            value={form.name}
            onChange={handleChange}
            required
          />

          <select
            name='type'
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value='dog'>Dog</option>
            <option value='cat'>Cat</option>
          </select>

          <input
            type='text'
            name='breed'
            placeholder='Breed'
            value={form.breed}
            onChange={handleChange}
            required
          />

          <input
            type='text'
            name='age'
            placeholder='Age'
            value={form.age}
            onChange={handleChange}
            required
          />

          <textarea
            name='description'
            placeholder='Description'
            value={form.description}
            onChange={handleChange}
            required
          ></textarea>

          <input
            type='text'
            name='image'
            placeholder='Image URL'
            value={form.image}
            onChange={handleChange}
            required
          />

          <button type='submit' className='main-btn'>
            {loading ? 'Adding...' : 'Add Pet'}
          </button>
        </form>
      </div>

      <div className='page-section'>
        <h2>All Pets</h2>
        <div className='admin-grid'>
          {pets.map((pet) => (
            <div key={pet._id} className='admin-card'>
              <img src={pet.image} alt={pet.name} className='admin-proof' />
              <h3>{pet.name}</h3>
              <p><strong>Type:</strong> {pet.type}</p>
              <p><strong>Breed:</strong> {pet.breed}</p>
              <p><strong>Age:</strong> {pet.age}</p>
              <p>{pet.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='page-section'>
        <h2>Donations</h2>
        <div className='admin-grid'>
          {donations.map((item) => (
            <div key={item._id} className='admin-card'>
              <h3>{item.fullName}</h3>
              <p><strong>Email:</strong> {item.email}</p>
              <p><strong>Amount:</strong> {item.amount} BHD</p>
              <p><strong>Note:</strong> {item.note}</p>

              {item.transferImage && (
                <img
                  src={`http://localhost:3000/uploads/${item.transferImage}`}
                  alt='transfer'
                  className='admin-proof'
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Admin
