import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaHeart, FaBars, FaTimes } from 'react-icons/fa';
import '../Styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <nav className='navbar'>
      <h3 className='logo' onClick={() => navigate('/')}>Look Bossy</h3>
      <div className={`sidenav ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={() => navigate('/catalogue')}>Catalogue</li>
          <li className='icon' onClick={() => navigate('/wishlist')}><FaHeart /> <span className='menu-text'>Wishlist</span></li>
          <li className='icon' onClick={() => navigate('/cart')}><FaShoppingCart /> <span className='menu-text'>Cart</span></li>
          <li className='icon' onClick={() => navigate('/profile')}><FaUser /> <span className='menu-text'>Profile</span></li>
        </ul>
      </div>
      <div className='search-container'>
      <input 
          type="text" 
          placeholder="Search products..." 
          className={`search-bar ${isSearchVisible ? 'show' : ''}`} 
        />
        <button className='search-btn' onClick={toggleSearch}><FaSearch /></button>
      </div>
      <div className='menu-toggle' onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
}

export default Navbar;
