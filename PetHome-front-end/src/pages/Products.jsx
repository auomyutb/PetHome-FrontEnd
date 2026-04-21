const Products = ({ products, addToCart }) => {
  return (
    <section className='page-section'>
      <h1>Our Products</h1>

      <div className='products-grid'>
        {products.map((product) => (
          <div key={product._id} className='product-card'>
            <img
              src={product.image}
              alt={product.name}
              className='product-image'
            />

            <h3>{product.name}</h3>
            <p className='product-description'>{product.description}</p>
            <p><strong>Price:</strong> {product.price} BHD</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>

            <button
              className='main-btn'
              onClick={() => addToCart(product._id)}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Products
