import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight, faShoppingCart, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Shop = () => {
    // load data
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        // Step-1: Get ID of the added product
        for (const id in storedCart) {
            // Step-2: Get the product from products state by using ID
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                // Step-3: Get quantity of thr product and set the data
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // Step-4: Add the added Product to the saved cart
                savedCart.push(addedProduct);
            }
        }
        // Step-5: Set the cart
        setCart(savedCart);
    }, [products]);


    const handleAddToCart = (product) => {
        // Add in the new array as new array
        // const newCart = [...cart, product];
        let newCart = [];

        // if product does not exist in the cart, then set quantity = 1
        // of exist update the quantity by 1
        const exist = cart.find(pd => pd.id === product.id);
        if (!exist) {
            product.quantity = 1;
            newCart = [...cart, product];
        } else {
            exist.quantity = exist.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exist];
        }

        setCart(newCart);
        addToDb(product.id); // Adding to local storage
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
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
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link className='proceed-link' to ="/orders">
                    <button className='btn-proceed'><span>Review Order</span>
                    <FontAwesomeIcon icon={faArrowCircleRight} />
                    </button>
                    </Link>
                </Cart>
            </div>

        </div>
    );
};

export default Shop;