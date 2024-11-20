import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/Products.css';
import Card from './SemiComponents/Card';
import Footer from './SemiComponents/Footer';
import Navbar from './SemiComponents/Navbar';
import { getData } from '../Utils/db';
import Loader from './SemiComponents/Loader';

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
      console.log(data);
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
              image={item.imageURL ? item.imageURL : 'https://drive.google.com/uc?export=view&id=1tO4y1BjnAyxyG3F417YtizX1c1fm64ub'}
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
