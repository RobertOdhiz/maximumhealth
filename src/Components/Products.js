import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/Products.css';
import { ProductsData } from '../Data/Products'; // Your hardcoded products
import Card from './SemiComponents/Card';
import Footer from './SemiComponents/Footer';
import Navbar from './SemiComponents/Navbar';
import { getData } from '../Utils/db'; // Utility function to fetch data from Google Sheets

function Products() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]); // State to hold all products

  // Function to handle navigation to the product details page
  const selectProductAndNavigate = (product) => {
    navigate(`/products/${product.title}${product.id}`, { state: { selectedProduct: product } });
  };

  // Fetch data from Google Sheets and merge with hardcoded products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataFromSheets = await getDataFromSheets(); // Fetch data from Google Sheets
        const combinedProducts = [...ProductsData, ...dataFromSheets]; // Merge hardcoded products with fetched data
        setAllProducts(combinedProducts); // Set the merged products in state
      } catch (error) {
        console.error('Error fetching data:', error); // Log error to console for debugging
      }
    };

    fetchData();
  }, []);

  // Fetch data from Google Sheets using the utility function
  const getDataFromSheets = async () => {
    try {
      const data = await getData('products'); // Fetch products from Google Sheets
      return data || []; // Return the data or an empty array if no data
    } catch (error) {
      console.error('Error retrieving data from Google Sheets:', error); // Log error to console for debugging
      return []; // Return an empty array if an error occurs
    }
  };

  return (
    <div>
      <Navbar />
      <div className='products'>
        {allProducts.map((item, key) => (
          <Card
            key={key}
            title={item.title}
            description={item.description}
            price={item.price}
            image={item.image || item.imageURL}
            onClick={() => selectProductAndNavigate(item)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Products;
