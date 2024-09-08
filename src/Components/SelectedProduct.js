import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from './SemiComponents/Card';
import { ProductsData } from '../Data/Products';
import { findRelatedProducts } from '../Utils/RelatedProducts';
import CheckoutForm from './SemiComponents/CheckoutForm';
import Footer from '../Components/SemiComponents/Footer';
import Navbar from './SemiComponents/Navbar';
import './Styles/SelectedProduct.css';

function SelectedProduct() {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedProduct, relatedProducts } = location.state || {};

  useEffect(() => {
    if (selectedProduct) {
      document.title = `Buy ${selectedProduct.title} | Maximum Health`;
    }
  }, [selectedProduct]);

  const formatPrice = (price) => {
    return `Ksh ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`; // Format price with commas
  };

  const selectProductAndNavigate = (product) => {
    navigate(`/products/${product.title}${product.id}`, {
      state: { selectedProduct: product, relatedProducts: findRelatedProducts(product, ProductsData) },
    });
  };

  return (
    <div className="selected-product-container">
        <Navbar />
      {selectedProduct && (
        <div className="product-details">
          <div className="product-image">
            <img src={selectedProduct.image} alt={selectedProduct.title} />
          </div>
          <div className="product-info-container">
            <div className="product-info">
              <h1>{selectedProduct.title}</h1>
              <p className="product-description">{selectedProduct.description}</p>
              <p className="product-price">{formatPrice(selectedProduct.price)}</p>
              {/* Checkout form to purchase the selected product */}
              <CheckoutForm item={selectedProduct} />
            </div>
          </div>
        </div>
      )}

      {/* List of Related Products */}
      <div className="related-products">
        <h2>Related Products</h2>
        <div className="products-list">
          {relatedProducts && relatedProducts.length > 0 ? (
            relatedProducts.map((product, key) => (
              <Card
                key={key}
                title={product.title}
                description={product.description}
                image={product.image}
                price={product.price}
                onClick={() => selectProductAndNavigate(product)}
              />
            ))
          ) : (
            <p>No related products found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SelectedProduct;
