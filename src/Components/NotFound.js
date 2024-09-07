import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/NotFound.css'
function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h1>Ooops!</h1>
      <p>We can't seem to find this page. Let's go back home, shall we?</p>
      <button className='btn' onClick={() => navigate('/')}>HomePage</button>
    </div>
  );
}

export default NotFound;
