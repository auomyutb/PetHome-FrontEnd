import { useState } from 'react'

const Admin = ({
  pets,
  donations,
  products,
  addPet,
  updatePet,
  deletePet,
  deleteDonation,
  addProduct,
  updateProduct,
  deleteProduct
}) => {
  const [form, setForm] = useState({
    name: '',
    type: 'dog',
    breed: '',
    age: '',
    description: '',
    image: ''
  })

  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    image: ''
  })

  const [loading, setLoading] = useState(false)
  const [editId, setEditId] = useState(null)
  const [productEditId, setProductEditId] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleProductChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setForm({
      name: '',
      type: 'dog',
      breed: '',
      age: '',
      description: '',
      image: ''
    })
    setEditId(null)
  }

  const resetProductForm = () => {
    setProductForm({
      name: '',
      description: '',
      price: '',
      quantity: '',
      image: ''
    })
    setProductEditId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    let success = false

    if (editId) {
      success = await updatePet(editId, form)
    } else {
      success = await addPet(form)
    }

    if (success) {
      alert(editId ? 'Pet updated successfully' : 'Pet added successfully')
      resetForm()
    } else {
      alert(editId ? 'Error updating pet' : 'Error adding pet')
    }

    setLoading(false)
  }

  const handleProductSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    let success = false

    if (productEditId) {
      success = await updateProduct(productEditId, productForm)
    } else {
      success = await addProduct(productForm)
    }

    if (success) {
      alert(productEditId ? 'Product updated successfully' : 'Product added successfully')
      resetProductForm()
    } else {
      alert(productEditId ? 'Error updating product' : 'Error adding product')
    }

    setLoading(false)
  }

  const handleEdit = (pet) => {
    setForm({
      name: pet.name,
      type: pet.type,
      breed: pet.breed,
      age: pet.age,
      description: pet.description,
      image: pet.image
    })

    setEditId(pet._id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleEditProduct = (product) => {
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      image: product.image
    })

    setProductEditId(product._id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this pet?')

    if (!confirmDelete) {
      return
    }

    const success = await deletePet(id)

    if (success) {
      alert('Pet deleted successfully')
    } else {
      alert('Error deleting pet')
    }
  }

  const handleDeleteDonation = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this donation?')

    if (!confirmDelete) {
      return
    }

    const success = await deleteDonation(id)

    if (success) {
      alert('Donation deleted successfully')
    } else {
      alert('Error deleting donation')
    }
  }

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?')

    if (!confirmDelete) {
      return
    }

    const success = await deleteProduct(id)

    if (success) {
      alert('Product deleted successfully')
    } else {
      alert('Error deleting product')
    }
  }

  return (
    <section className='page-section'>
      <h1>Admin Page</h1>

      <div className='admin-form-box'>
        <h2>{editId ? 'Update Pet' : 'Add New Pet'}</h2>

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

          <div className='admin-buttons-row'>
            <button type='submit' className='main-btn'>
              {loading ? 'Saving...' : editId ? 'Update Pet' : 'Add Pet'}
            </button>

            {editId && (
              <button
                type='button'
                className='cancel-btn'
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
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

              <div className='admin-buttons-row'>
                <button className='edit-btn' onClick={() => handleEdit(pet)}>
                  Edit
                </button>

                <button className='delete-btn' onClick={() => handleDelete(pet._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='admin-form-box'>
        <h2>{productEditId ? 'Update Product' : 'Add New Product'}</h2>

        <form onSubmit={handleProductSubmit} className='donation-form'>
          <input
            type='text'
            name='name'
            placeholder='Product Name'
            value={productForm.name}
            onChange={handleProductChange}
            required
          />

          <textarea
            name='description'
            placeholder='Description'
            value={productForm.description}
            onChange={handleProductChange}
            required
          ></textarea>

          <input
            type='number'
            name='price'
            placeholder='Price'
            value={productForm.price}
            onChange={handleProductChange}
            required
          />

          <input
            type='number'
            name='quantity'
            placeholder='Quantity'
            value={productForm.quantity}
            onChange={handleProductChange}
            required
          />

          <input
            type='text'
            name='image'
            placeholder='Image URL'
            value={productForm.image}
            onChange={handleProductChange}
            required
          />

          <div className='admin-buttons-row'>
            <button type='submit' className='main-btn'>
              {loading ? 'Saving...' : productEditId ? 'Update Product' : 'Add Product'}
            </button>

            {productEditId && (
              <button
                type='button'
                className='cancel-btn'
                onClick={resetProductForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className='page-section'>
        <h2>All Products</h2>
        <div className='admin-grid'>
          {products.map((product) => (
            <div key={product._id} className='admin-card'>
              <img src={product.image} alt={product.name} className='admin-proof' />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>Price:</strong> {product.price} BHD</p>
              <p><strong>Quantity:</strong> {product.quantity}</p>

              <div className='admin-buttons-row'>
                <button className='edit-btn' onClick={() => handleEditProduct(product)}>
                  Edit
                </button>

                <button className='delete-btn' onClick={() => handleDeleteProduct(product._id)}>
                  Delete
                </button>
              </div>
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

              <div className='admin-buttons-row'>
                <button
                  className='delete-btn'
                  onClick={() => handleDeleteDonation(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Admin
