import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Search from '../assets/search.svg';
import './Styles/Products.css';
import { ProductsData } from '../Data/Products';
import Card from './SemiComponents/Card';
import Footer from './SemiComponents/Footer';

function Products() {
  const navigate = useNavigate();
  const [seen, setSeen] = useState(false);
  const [shown, setShown] = useState('hidden');

  const toggleSearch = () => {
    console.log(seen);
    if (seen) {
      setSeen(false);
      setShown('hidden')
    } else {
      setSeen(true);
      setShown('seen');
    }
  };
  const [selectedProduct, setSelectedProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState(null);

    const selectProductAndNavigate = (product) => {
        setSelectedProduct(product);
        // const related = findRelatedProducts(product, ProductsData);
        // setRelatedProducts(related);
        
        navigate(`/products/${product.title}${product.id}`, { state: { selectedProduct: product } });
    };

  return (
    <div>
      <nav>
          <h3 className='logo' onClick={() => navigate('/')}>Look Bossy</h3>
          <div className='prod-nav'>
              <ul>
                  <li><input
                  type='text'
                  placeholder='Search Items'
                  className={shown}
                  /></li>
                  <li onClick={toggleSearch}><img src={Search} alt='' /></li>
              </ul>
          </div>
      </nav>
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
  )
}

export default Products