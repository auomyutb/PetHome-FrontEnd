import { Link } from 'react-router-dom'
import logo from '../assets/pethome-logo.png'

const Header = ({ user, signOutUser, cart }) => {
  const cartCount = cart?.products?.reduce((total, item) => {
    return total + item.quantity
  }, 0) || 0

  return (
    <header className='header'>
      <Link to='/'>
        <img src={logo} alt='petHome logo' className='header-logo' />
      </Link>

      <nav className='nav'>
        <Link to='/'>Home</Link>
        <Link to='/products'>Products</Link>
        <Link to='/cart'>Cart ({cartCount})</Link>
        <Link to='/dogs'>Dogs</Link>
        <Link to='/cats'>Cats</Link>
        <Link to='/team'>Our Team</Link>
        <Link to='/donate' className='donate-btn'>Donate</Link>

        {!user ? (
          <>
            <Link to='/sign-up'>Sign Up</Link>
            <Link to='/sign-in'>Sign In</Link>
          </>
        ) : (
          <>
            {user.isAdmin && <Link to='/admin'>Admin</Link>}
            <button onClick={signOutUser} className='logout-btn'>Logout</button>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
