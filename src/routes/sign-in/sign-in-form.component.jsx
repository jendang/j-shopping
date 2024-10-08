import {  useState } from "react"
//import { useEffect } from "react"
//import {  getRedirectResult } from "firebase/auth" 
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils"; 

import FormInput from "../../components/form-input/form-input.component"

import Button from "../../components/button/button.component";

import "./sign-in-form.styles.scss"


const defaultFormFields = {
   
    email: '',
    password: '',
    
}

const SignInForm = () => {

     //https://firebase.google.com/docs/auth/web/redirect-best-practices?hl=en&authuser=0&_gl=1*1m5qafc*_ga*MTQwMjAwOTExMS4xNzA4MDEzNjUz*_ga_CW55HF8NVT*MTcyODEzNjg4MC4xMy4xLjE3MjgxMzY4ODguNTIuMC4w

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

    const [ formFields, setFormFields ] = useState(defaultFormFields);

    const { email, password } = formFields;

    //const { setCurrentUser } = useContext(UserContext); // we use Observer of auth changes to manage this

    const handleChange = (event)=> {
        const { name, value } = event.target;
        setFormFields(() => {
            return({
                ...formFields,
                [name]: value
            })
        });
    }

    const resetFormFields = () => {
        return setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            //const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            //console.log(user);

            //setCurrentUser(user); // we use Observer of auth changes to manage this

            resetFormFields();


        } catch (error) {
                switch(error.code){
                    case "auth/wrong-password":
                        alert("incorrect password or email");
                        break;
                    case "auth/user-not-found":
                        alert("no user associcated with this email");
                        break;
                    default:
                        console.log(error.message);

                }
        }

        

       
    }

    const signInWithGoogleUser = async () => {

        const {user} = await signInWithGooglePopup();
       // console.log(user);
        
        
    }

    return(
        <div className="sign-up-container">
            <h2>Already have an account? </h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
             
                <FormInput label="Email" onChange={handleChange} name="email" value={email} type="email"/>
                <FormInput label="Password" onChange={handleChange} name="password" value={password} type="password"/>
                <div className="buttons-container">
                    <Button type="submit" buttonType="default">Sign In</Button>
                    <Button type="button" onClick={signInWithGoogleUser} buttonType="google">Google SignIn</Button>
                    {/* Not working */}
                    {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
                </div>
            </form>
        </div>
    );
};

export default SignInForm;