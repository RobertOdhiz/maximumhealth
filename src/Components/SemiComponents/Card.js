import React from 'react';
import './../Styles/Card.css';

function Card(props) {
  return (
    <div className='card' onClick={props.onClick}>
      <img src={props.image} alt={props.title} className='card-image' />
      <div className='card-text'>
        <h5>{props.title}</h5>
        <p>{props.description}</p>
        <p className='card-price'>Ksh {props.price}</p>
      </div>
    </div>
  );
}

export default Card;