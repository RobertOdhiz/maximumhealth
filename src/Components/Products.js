import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../assets/search.svg';
import './Styles/Products.css';
import { ProductsData } from '../Data/Products';
import Card from './SemiComponents/Card';
import Footer from './SemiComponents/Footer';
import Navbar from './SemiComponents/Navbar';

function Products() {
  const navigate = useNavigate();
  const [seen, setSeen] = useState(false);
  const [shown, setShown] = useState('hidden');

  const toggleSearch = () => {
    setSeen(!seen);
    setShown(seen ? 'hidden' : 'seen');
  };

  const selectProductAndNavigate = (product) => {
    // Navigating to the product details page with the selected product
    navigate(`/products/${product.title}${product.id}`, { state: { selectedProduct: product } });
  };

  return (
    <div>
      <Navbar />
      <div className='products'>
        {ProductsData.map((item, key) => (
          <Card
            key={key}
            title={item.title}
            description={item.description}
            price={item.price}
            image={item.image}
            onClick={() => selectProductAndNavigate(item)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Products;
