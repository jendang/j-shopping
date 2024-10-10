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
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    total: 0
});

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const isExistedCartItem = cartItems.find(item => item.id === productToAdd.id);
   
    // if found: increment quantity, 
    if(isExistedCartItem){
        return cartItems.map(item => item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item )
    }

    // not find: add productToAdd to cartItems, return new array with modified cartItems/new cartItem
    return [...cartItems, { ...productToAdd, quantity: 1 }];

}


const removeCartItem = (cartItems, cartItemToRemove) => {
    // find cartItem to remove in cart items
    const existingCartItem = cartItems.find(item => item.id === cartItemToRemove.id);

    //check quantity = 1, remove the item from the cart
    if(existingCartItem.quantity === 1){
        return cartItems.filter(item => item.id !== cartItemToRemove.id);
    }

    // return new array with matching cart item with reduced quantity (quantity > 1)
    return cartItems.map(item => {
       return item.id === removeCartItem.id ?  { ...cartItemToRemove, quantity: cartItemToRemove.quantity - 1 } : item
    })
     
}

const deleteCartItem = (cartItems, cartItemToDelete) => {
    // find cartItem to remove in cart items
    const existingCartItem = cartItems.find(item => item.id === cartItemToDelete.id);

    //delete the item from the cart
    if(existingCartItem){
        return cartItems.filter(item => item.id !== cartItemToDelete.id);
    }
     
}




export const CartProvider = ({ children }) => {
    const [ isCartOpen, setIsCartOpen ] = useState(false);

    const [ cartItems, setCartItems ] = useState([]);

    const [ cartCount, setCartCount ] = useState(0);

    const [ total, setTotal ] = useState(0);

    //count changes everytimes add new item
    useEffect(() => {
        //accumulate count the total count
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);

    }, [cartItems])

    useEffect(() => {
        //accumulate count the total count
        const newTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity*cartItem.price, 0);
        setTotal(newTotal);

    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToDelete) => {
        setCartItems(deleteCartItem(cartItems, cartItemToDelete));
    }


    const value = {isCartOpen, cartItems, cartCount, total, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart };

    return (<CartContext.Provider value={value}>{ children }</CartContext.Provider>)
}