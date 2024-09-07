import React, { useEffect } from 'react';
import './Styles/HomePage.css';
import TopPage2 from './../assets/Top_Page_2.png';
import { useNavigate } from 'react-router-dom';
import { ProductsData } from '../Data/Products';
import Card from './SemiComponents/Card';
import { findRelatedProducts } from '../Utils/RelatedProducts';
import Footer from './SemiComponents/Footer';
import Navbar from './SemiComponents/Navbar';

function HomePage() {
  const navigate = useNavigate();
  const firstFourProducts = ProductsData.slice(0, 4);

  const selectProductAndNavigate = (product) => {
    const related = findRelatedProducts(product, ProductsData);

    // Navigating to the product details page with the selected product and its related products
    navigate(`/products/${product.title}${product.id}`, { state: { selectedProduct: product, relatedProducts: related } });
  };

  useEffect(() => {
    document.title = 'Maximum Health | Home - Discover best Health options';
  }, []);

  return (
    <div>
      <Navbar />
      <div className='top-page'>
        <div className='img-container'>
          <img src={TopPage2} alt='' />
        </div>
        <div className='top-content'>
          <h1>Look Bossy</h1>
          <p>Your one-stop online shop for Healthy Products with Free Delivery Countrywide</p>
          <button className='btn' onClick={() => navigate('/catalogue')}>
            <span>Shop Now</span>
            <i className="bi bi-arrow-right-short"></i>
          </button>
        </div>
      </div>
      <div className='products-container'>
        <h2>Products</h2>
        <p className='products-description'>Shop From us and enjoy exclusive discounts</p>
        <div className='products'>
          {firstFourProducts.map((item, key) => (
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
        <button className='view-all-btn' onClick={() => navigate('/catalogue')}>
          View All
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
