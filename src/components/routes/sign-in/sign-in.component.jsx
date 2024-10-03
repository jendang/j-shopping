import { useEffect } from "react"

import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
     
} from "../../../utils/firebase/firebase.utils"

import {  getRedirectResult } from "firebase/auth" 

const SignIn = () => {
    //if you pass empty array [], it will run only once when the app intialized render
    // useEffect(() => {
    //     //IMPORTANT: react 18 cannot add async in useEffect, if u wanna call async func, create inner async func and call it
    //     const getResponse = async() => {
    //         const res = await getRedirectResult(auth); // NOT WORKING, return NULL
    //         console.log(res);
    //         if(res)
    //             await createUserDocumentFromAuth(res.user);
    //     }
    //     getResponse();  
        
    // }, [])

 

    const logGoogleUser = async () => {

        const {user} = await signInWithGooglePopup();
        console.log(user);
        await createUserDocumentFromAuth(user)

    }


    return(
        <div>
            <h1>Sign In page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>

            {/* Not working */}
            {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
        </div>

    )
}

export default SignIn