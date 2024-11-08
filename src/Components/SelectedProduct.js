import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from './SemiComponents/Card';
import { ProductsData } from '../Data/Products';
import { findRelatedProducts } from '../Utils/RelatedProducts';
import CheckoutForm from './SemiComponents/CheckoutForm';
import Footer from '../Components/SemiComponents/Footer';
import Navbar from './SemiComponents/Navbar';
import './Styles/SelectedProduct.css';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Function to format description using Markdown
const formatDescription = (description) => {
  // Convert Markdown to HTML
  const rawMarkup = marked(description);

  // Sanitize the HTML
  const sanitizedMarkup = DOMPurify.sanitize(rawMarkup);

  return { __html: sanitizedMarkup };
};

function SelectedProduct() {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedProduct, relatedProducts } = location.state || {};

  useEffect(() => {
    if (selectedProduct) {
      document.title = `Order ${selectedProduct.title} | Maximum Health`;
    }
  }, [selectedProduct]);

  const formatPrice = (price) => {
    return `Ksh ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`; // Format price with commas
  };

  const selectProductAndNavigate = (product) => {
    navigate(`/products/${product.title}${product.uuid}`, {
      state: { selectedProduct: product, relatedProducts: findRelatedProducts(product, ProductsData) },
    });
  };

  // Function to generate the href dynamically from the src
  const getHrefFromSrc = (src) => {
    // Extract the ID part from the src (assuming the src format is "https://i.ibb.co/<id>/<image-name>")
    const matches = src.match(/https:\/\/i\.ibb\.co\/([a-zA-Z0-9]+)\/.*/);
    return matches ? `https://ibb.co/${matches[1]}` : '#'; // Return the modified URL or a fallback
  };

  // Function to add the product to the cart
  // const addToCart = () => {
  //   const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  //   const productInCart = storedCart.find(item => item.uuid === selectedProduct.uuid);

  //   if (productInCart) {
  //     productInCart.quantity += 1;
  //   } else {
  //     storedCart.push({ ...selectedProduct, quantity: 1 });
  //   }

  //   localStorage.setItem('cart', JSON.stringify(storedCart));
  //   toast.success(`${selectedProduct.title} successfully added to cart.`);
  // };

  return (
    <div className="selected-product-container">
      <Navbar />
      {selectedProduct && (
        <div className="product-details">
          <div className="product-image">
            <a href={getHrefFromSrc(selectedProduct.imageURL)}>
              <img src={selectedProduct.imageURL} alt={selectedProduct.title} />
            </a>
            <p className="product-description" dangerouslySetInnerHTML={formatDescription(selectedProduct.description)} />
          </div>
          <div className="product-info-container">
            <div className="product-info">
              <h1>{selectedProduct.title}</h1>
              <p className="product-price">{formatPrice(selectedProduct.price)}</p>
              {/* <button onClick={addToCart} className="btn primary-btn">Add to Cart</button> */}
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
