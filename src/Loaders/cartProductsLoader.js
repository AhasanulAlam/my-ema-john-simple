import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () =>{
    const loadedProducts = await fetch('products.json');
    const products = await loadedProducts.json();

    // if data in the database we must use async and await
    const storedCart = getShoppingCart();
    const savedCart = [];

    for (const id in storedCart){
        const addedProduct = products.find(pd => pd.id === id);
        if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
    }

    // if we need to send two things
    // return [products,savedCart];
    // another option
    // return {products, cart: savedCart};


    return savedCart;
}

export default cartProductsLoader;