import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getById } from '../Utils/db';
import Card from './SemiComponents/Card';
import { findRelatedProducts } from '../Utils/RelatedProducts';
import CheckoutForm from './SemiComponents/CheckoutForm';
import Footer from '../Components/SemiComponents/Footer';
import Navbar from './SemiComponents/Navbar';
import './Styles/SelectedProduct.css';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Loader from './SemiComponents/Loader';

// Function to format description using Markdown
const formatDescription = (description) => {
  if (!description) return { __html: '' }; // Handle null/undefined description
  const rawMarkup = marked(description);
  const sanitizedMarkup = DOMPurify.sanitize(rawMarkup);
  return { __html: sanitizedMarkup };
};

function SelectedProduct() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const uuid = queryParams.get('id'); // Extract `id` from query parameters

  const { selectedProduct: stateProduct, relatedProducts: stateRelatedProducts } = location.state || {};
  const [selectedProduct, setSelectedProduct] = useState(stateProduct || { title: '', description: '', price: 0, imageURL: '' });
  const [relatedProducts, setRelatedProducts] = useState(stateRelatedProducts || []);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    // Fetch product if not passed via state
    const fetchProduct = async () => {
      try {
        if (!uuid) throw new Error('Product ID is missing in the URL.');
        const product = await getById('products', uuid);
        if (!product) throw new Error('Product not found.');
        setSelectedProduct(product);

        // Fetch related products
        const related = findRelatedProducts(product);
        setRelatedProducts(related || []);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error(err.message);
        setError(err.message);
        navigate('/not-found');
      }
    };

    if (!stateProduct) {
      fetchProduct();
    } else {
      document.title = `Order ${stateProduct.title} | Maximum Health`;
    }
  }, [stateProduct, uuid, navigate]);

  const formatPrice = (price) => {
    return `Ksh ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const selectProductAndNavigate = (product) => {
    navigate(`/products/${product.title}?id=${product.uuid}`, {
      state: { selectedProduct: product, relatedProducts: findRelatedProducts(product) },
    });
  };

  const getHrefFromSrc = (src) => {
    const matches = src.match(/https:\/\/i\.ibb\.co\/([a-zA-Z0-9]+)\/.*/);
    return matches ? `https://ibb.co/${matches[1]}` : '#';
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (error) {
    return (
      <div className="error-container">
        <Navbar />
        <h1>Error</h1>
        <p>{error}</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="selected-product-container">
      <Navbar />
      {selectedProduct && selectedProduct.title ? (
        <div className="product-details">
          <div className="product-image">
            <a href={getHrefFromSrc(selectedProduct.imageURL)}>
              <img src={selectedProduct.imageURL} alt={selectedProduct.title} />
            </a>
          </div>
          <div className="product-info-container">
            <div className="product-info">
              <h1>{selectedProduct.title}</h1>
              <p className="product-price">{formatPrice(selectedProduct.price)}</p>

              <CheckoutForm item={selectedProduct} />

              <div className="product-description">
                <p
                  dangerouslySetInnerHTML={formatDescription(
                    showFullDescription
                      ? selectedProduct.description
                      : selectedProduct.description.slice(0, 200) + '...'
                  )}
                />
                {selectedProduct.description && selectedProduct.description.length > 200 && (
                  <button onClick={toggleDescription} className="btn read-more-btn">
                    {showFullDescription ? 'Read Less' : 'Read More'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}

      <div className="related-products">
        <h2>Related Products</h2>
        <div className="products-list">
          {relatedProducts?.length > 0 ? (
            relatedProducts.map((product, key) => (
              <Card
                key={key}
                title={product.title}
                description={product.description}
                image={product.imageURL}
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
