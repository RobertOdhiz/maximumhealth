import React, { useEffect, useState } from 'react';
import './Styles/HomePage.css';
import TopPage2 from './../assets/Top_Page_2.png';
import { useNavigate } from 'react-router-dom';
import { ProductsData } from '../Data/Products';
import Card from './SemiComponents/Card';
import { findRelatedProducts } from '../Utils/RelatedProducts'
import Footer from './SemiComponents/Footer';

function HomePage() {
    const navigate = useNavigate();
    const firstFourProducts = ProductsData.slice(0, 4);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState(null);

    const selectProductAndNavigate = (product) => {
        setSelectedProduct(product);
        const related = findRelatedProducts(product, ProductsData);
        setRelatedProducts(related);
        
        navigate(`/products/${product.title}${product.id}`, { state: { selectedProduct: product, relatedProducts: related } });
    };

    useEffect(() => {
        document.title = 'Maximum Health | Home - Discover best Health options'
    }, [])

    return (
        <div>
            <nav>
                <h3 className='logo' onClick={() => navigate('/')}>Look Bossy</h3>
                <div className='sidenav'>
                    <ul>
                        <li onClick={() => navigate('/catalogue')}>Catalogue</li>
                    </ul>
                </div>
            </nav>
            <div className='top-page'>
                <div className='img-container'>
                    <img src={TopPage2} alt=''/>
                </div>
                <div className='top-content'>
                    <h1>Look Bossy</h1>
                    <p>Your one stop online shop for Healthy Products with Free Delivery Countrywide</p>
                    <button className='btn' onClick={() => navigate('/catalogue')}>
                        <span>Shop Now</span>
                        <i className="bi bi-arrow-right-short"></i>
                    </button>
                </div>
            </div>
            <div className='products-container'>
                <h2>Products</h2>
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
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
