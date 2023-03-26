import React, { useEffect, useState } from 'react';
import './Shop.css';

const Shop = () => {
    // load data
    const [products,setProducts] = useState([]);

    useEffect( ()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])

    return (
        <div className='shop-container'>
            <div className="products-container">
                <h2>Products coming here: {products.length}</h2>
            </div>
            <div className="cart-container">
                <h3>Order Summary</h3>
            </div>
            
        </div>
    );
};

export default Shop;