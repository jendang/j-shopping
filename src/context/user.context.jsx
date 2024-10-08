import { createContext, useState, useEffect } from "react"
import { createUserDocumentFromAuth, onAuthStateChangedListenter } from "../utils/firebase/firebase.utils";

//as the actual value u want to access from children component, UserContext is top level wrap around App
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser ] = useState(null);

    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        //stop listening 
        const unsubscribe = onAuthStateChangedListenter((user) => { 
            console.log(user)
            if(user){
                createUserDocumentFromAuth(user);
            }

            setCurrentUser(user);
        })

        return unsubscribe;
    }, [])

    //children here mean child components that wrap inside UserContextProvider
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}