import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaHeart } from 'react-icons/fa';

function Navbar() {
    const navigate = useNavigate();
  return (
    <nav className='navbar'>
        <h3 className='logo' onClick={() => navigate('/')}>Look Bossy</h3>
        <div className='sidenav'>
          <ul>
            <li onClick={() => navigate('/catalogue')}>Catalogue</li>
            <li className='icon' onClick={() => navigate('/wishlist')}><FaHeart /></li> {/* Wishlist Icon */}
            <li className='icon' onClick={() => navigate('/cart')}><FaShoppingCart /></li> {/* Cart Icon */}
            <li className='icon' onClick={() => navigate('/profile')}><FaUser /></li> {/* User Profile Icon */}
          </ul>
        </div>
        <div className='search-container'>
          <input type="text" placeholder="Search products..." className='search-bar' />
          <button className='search-btn'><FaSearch /></button>
        </div>
      </nav>
  )
}

export default Navbar