import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './../Styles/Card.css';

// Loader component
const Loader = () => (
  <div className="loader"></div>
);

function Card(props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true); // State for loading

  // Utility function to parse image URLs from a string into an array
  function parseImageURLs(imageString) {
    if (!imageString) return []; // If imageString is empty or undefined, return an empty array
    return imageString.split(',').map(url => url.trim());
  }

  // Convert the image URL string to an array
  const images = parseImageURLs(props.image);

  useEffect(() => {
    setLoading(true); // Set loading to true when the component mounts or image changes
  }, [currentImageIndex, images]);

  // Function to handle image load
  const handleImageLoad = () => {
    setLoading(false); // Stop loading when the image is fully loaded
  };

  // Function to handle errors while loading image
  const handleImageError = () => {
    setLoading(false); // Stop loading on error
  };

  // Function to go to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className='card'>
      <div className='card-image-container'>
          <img
            src={images[currentImageIndex]}
            alt={props.title}
            className='card-image'
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
      </div>
      <div className='card-text' onClick={props.onClick}>
        <h5>{props.title}</h5>
        <p>{props.description}</p>
        <p className='card-price'>Ksh {props.price}</p>
      </div>
    </div>
  );
}

export default Card;
