import { Link } from 'react-router-dom'

const Header = ({ user, signOutUser }) => {
  return (
    <header className='header'>
      <div className='logo'>petHome</div>

      <nav className='nav'>
        <Link to='/'>Home</Link>
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
