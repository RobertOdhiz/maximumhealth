import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import '../Styles/Navbar.css';
import { searchProducts } from '../../Utils/db';

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = async (e) => {
    const text = e.target.value;
    setSearchText(text);


    if (text.trim() !== '') {
      try {
        const results = await searchProducts(text);
        setSearchResults(results);
      } catch (error) {
        console.error("Error searching for products:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (title) => {
    setSearchText(title);
    setSearchResults([]);
    navigate(`/catalogue?search=${encodeURIComponent(title)}`);
  };

  return (
    <nav className='navbar'>
      <h3 className='logo' onClick={() => navigate('/')}>Maximum Health</h3>
      <div className={`sidenav ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={() => navigate('/catalogue')}>Catalogue</li>
          <li className='icon' onClick={() => navigate('/cart')}><FaShoppingCart /> <span className='menu-text'>Cart</span></li>
        </ul>
      </div>
      <div className='search-container'>
        <input
          type="text"
          placeholder="Search products..."
          className={`search-bar ${isSearchVisible ? 'show' : ''}`}
          value={searchText}
          onChange={handleSearchChange}
        />
        <button className='search-btn' onClick={() => setIsSearchVisible(!isSearchVisible)}><FaSearch /></button>
        {searchResults.length > 0 && (
          <ul className='search-results'>
            {searchResults.map((item, index) => (
              <li key={index} onClick={() => handleResultClick(item.title)}>
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='menu-toggle' onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
}

export default Navbar;
