import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './Styles/Products.css';
import Card from './SemiComponents/Card';
import Footer from './SemiComponents/Footer';
import Navbar from './SemiComponents/Navbar';
import { getData } from '../Utils/db';
import Loader from './SemiComponents/Loader';
import defaultImage from '../assets/Top_Page_2.png';

function Products() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const selectProductAndNavigate = (product) => {
    navigate(`/products/${product.title}?id=${product.uuid}`, { state: { selectedProduct: product } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataFromSheets = await getDataFromSheets();
        setAllProducts(dataFromSheets);
        setLoading(false); // Data has been fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Even if there's an error, stop loading
      }
    };

    fetchData();
  }, []);

  const getDataFromSheets = async () => {
    try {
      const data = await getData('products');
      return data || [];
    } catch (error) {
      console.error('Error retrieving data from Google Sheets:', error);
      return [];
    }
  };

  // Handle image load event
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div>
      <Helmet>
        <title>All Products</title>
        <meta name="description" content="Browse through our wide range of amazing products available for purchase." />
        <meta property="og:title" content="All Products | Maximum Health" />
        <meta property="og:description" content="Browse through our wide range of amazing products available for purchase." />
        <meta property="og:image" content={defaultImage} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="All Products" />
        <meta name="twitter:description" content="Browse through our wide range of amazing products available for purchase." />
        <meta name="twitter:image" content={defaultImage} />
      </Helmet>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className='products'>
          {allProducts.map((item, key) => (
            <Card
              key={key}
              title={item.title}
              price={item.price}
              image={item.imageURL ? item.imageURL : defaultImage}
              onClick={() => selectProductAndNavigate(item)}
              onImageLoad={handleImageLoad}
            />
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Products;
