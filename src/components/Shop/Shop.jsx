import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    // load data
    const [products, setProducts] = useState([]);
    const [cart, setCart] =useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    useEffect( ()=>{
        const storedCart = getShoppingCart();
        const savedCart = [];
        // Step-1: Get ID of the added product
        for(const id in storedCart){
            // Step-2: Get the product from products state by using ID
            const addedProduct = products.find(product => product.id === id);
            if(addedProduct){
                // Step-3: Get quantity of thr product and set the data
                const quantity = storedCart[id];
                addedProduct.quantity =  quantity;
                // Step-4: Add the added Product to the saved cart
                savedCart.push(addedProduct);
            }
        }
        // Step-5: Set the cart
        setCart(savedCart);
    }, [products]);


    const handleAddToCart = (product) => {
        // Add in the new array as new array
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id); // Adding to local storage
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>

        </div>
    );
};

export default Shop;