const CartPage = ({ cart, removeFromCart, clearCart }) => {
  const totalPrice = cart?.products?.reduce((total, item) => {
    return total + (item.product?.price || 0) * item.quantity
  }, 0) || 0

  return (
    <section className='page-section'>
      <h1>Your Cart</h1>

      {!cart || !cart.products || cart.products.length === 0 ? (
        <div className='empty-cart'>
          <h2>Your cart is empty</h2>
          <p>Add products from the products page.</p>
        </div>
      ) : (
        <>
          <div className='cart-grid'>
            {cart.products.map((item) => (
              <div key={item.product?._id} className='cart-card'>
                <img
                  src={item.product?.image}
                  alt={item.product?.name}
                  className='cart-image'
                />

                <div className='cart-info'>
                  <h3>{item.product?.name}</h3>
                  <p>{item.product?.description}</p>
                  <p><strong>Price:</strong> {item.product?.price} BHD</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>

                  <button
                    className='delete-btn'
                    onClick={() => removeFromCart(item.product?._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className='cart-summary'>
            <h2>Total: {totalPrice} BHD</h2>

            <button className='clear-btn' onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </section>
  )
}

export default CartPage
