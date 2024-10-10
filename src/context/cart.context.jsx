import { createContext, useEffect, useState } from "react";


/*
    Product
    {
        id,
        name,
        price,
        imageUrl
    }

    CartItem
    {
        id,
        name,
        price,
        imageUrl,
        quantity : *** ADD EXTRA FIELD FOR CARTIEM
    }

*/


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    //setCartItems: () => {},
    addItemToCart: () => {},
    cartCount: 0
});

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const isExistedCartItem = cartItems.find(item => item.id === productToAdd.id);

    // if found: increment quantity, 
    if(isExistedCartItem){
        return cartItems.map(item => item.id === productToAdd.id ? { item, quantity: item.quantity + 1 } : item )
    }


    // not find: add productToAdd to cartItems, return new array with modified cartItems/new cartItem
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}


export const CartProvider = ({ children }) => {
    const [ isCartOpen, setIsCartOpen ] = useState(false);

    const [ cartItems, setCartItems ] = useState([]);

    const [ cartCount, setCartCount ] = useState(0);

    //count changes everytimes add new item
    useEffect(() => {
        //accumulate count the total count
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
        
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }


    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };

    return (<CartContext.Provider value={value}>{ children }</CartContext.Provider>)
}