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
export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({ children }) => {
    const [ categoriesMap, setCategoriesMap ] = useState({})

    // *** RUN ONE TIME TO WRITE DATA INTO FIRESTORE DATABASE
    // useEffect(() => {
    //     addCollectionAndDocuments("categories", SHOP_DATA);
    // }, [])

    useEffect(() => {
        const getCategoriesMap = async() => {
            const categoriesMap = await getCategoriesAndDocuments();
            console.log(categoriesMap);
            setCategoriesMap(categoriesMap);
        }


        getCategoriesMap();
    }, [])

    const value = { categoriesMap }

    return <CategoriesContext.Provider value={value}>{ children }</CategoriesContext.Provider>
}