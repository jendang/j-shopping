import { createContext, useEffect, useState } from 'react'
//import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils.js';
//import SHOP_DATA  from '../shop-data.js'
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

/*
    // SAMPLE DATA STRUCTURE
    hats:{
        title: "Hats"
        items: [
            {
                id,
                name, 
                price,
            },
            {},
        ]
    }
*/
export const ProductsContext = createContext({
    products: []
});

export const ProductsProvider = ({ children }) => {
    const [ products, setProducts ] = useState([])

    // *** RUN ONE TIME TO WRITE DATA INTO FIRESTORE DATABASE
    // useEffect(() => {
    //     addCollectionAndDocuments("categories", SHOP_DATA);
    // }, [])

    useEffect(() => {
        const getCategoriesMap = async() => {
            const categoriesMap = await getCategoriesAndDocuments();
            console.log(categoriesMap);
        }


        getCategoriesMap();
    }, [])

    const value = { products }

    return <ProductsContext.Provider value={value}>{ children }</ProductsContext.Provider>
}