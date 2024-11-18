import React, { useState } from 'react';
import './../Styles/Card.css';

function Card(props) {
  const [loadingImage, setLoadingImage] = useState(true);

  const formatPrice = (price) => {
    return `Ksh ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const getHrefFromSrc = (src) => {
    const matches = src.match(/https:\/\/i\.ibb\.co\/([a-zA-Z0-9]+)\/.*/);
    return matches ? `https://ibb.co/${matches[1]}` : '#'; // Return the modified URL or a fallback
  };

  const href = getHrefFromSrc(props.image);

  return (
    <div className='card'>
      <div className='card-image-container'>
        {loadingImage && <div className='image-placeholder'>Loading...</div>}
        <a href={href}>
          <img
            src={props.image}
            alt={props.title}
            border="0"
            onLoad={() => setLoadingImage(false)}
          />
        </a>
      </div>
      <div className='card-text' onClick={props.onClick}>
        <h5>{props.title}</h5>
        {/* <p>{props.description}</p> */}
        <p className='card-price'>{formatPrice(props.price)}</p>
      </div>
    </div>
  );
}

export default Card;
