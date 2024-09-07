import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from './SemiComponents/Card';
import { ProductsData } from '../Data/Products';
import { findRelatedProducts } from '../Utils/RelatedProducts'
import CheckoutForm from './SemiComponents/CheckoutForm';

function SelectedProduct() {
    const location = useLocation();
    const navigate = useNavigate();

    const { selectedProduct, relatedProducts } = location.state || {};

    useEffect(() => {
        if (selectedProduct) {
            document.title = `Buy ${selectedProduct.title} | Maximum Health`;
        }
    }, [selectedProduct]);

    const selectProductAndNavigate = (product) => {
        navigate(`/products/${product.name}${product.id}`, { state: { selectedProduct: product, relatedProducts: findRelatedProducts(product, ProductsData) } });
    };

    return (
        <div>
            {selectedProduct && (
                <div>
                    <div>
                        <img src={selectedProduct.image} alt={selectedProduct.title} />
                    </div>
                    <div>
                        <h1>{selectedProduct.title}</h1>
                        <p>{selectedProduct.description}</p>
                        <p>{selectedProduct.price}</p>
                    </div>
                </div>
            )}
            <CheckoutForm props={selectedProduct} />
            <div>
                {relatedProducts && relatedProducts.map((product, key) => (
                    <Card
                        key={key}
                        title={product.title}
                        description={product.description}
                        image={product.image}
                        price={product.price}
                        onClick={() => selectProductAndNavigate(product)}
                    />
                ))}
            </div>
        </div>
    );
}

export default SelectedProduct;
