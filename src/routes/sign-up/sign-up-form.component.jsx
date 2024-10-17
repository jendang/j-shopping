import {  useState } from "react"

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"; 

import FormInput from "../../components/form-input/form-input.component"

import Button from "../../components/button/button.component.tsx";

import "./sign-up-form.styles.scss"



const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    //const { setCurrentUser } = useContext(UserContext); //we use Observer

    const [ formFields, setFormFields ] = useState(defaultFormFields);

    const { displayName, email, password, confirmPassword } = formFields;

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

        //check pass and confirm pass
        if(password !== confirmPassword){
            alert("password do not match");
            return;
        }

        try {
            const { user } =  await createAuthUserWithEmailAndPassword(email, password);
            
            //console.log(user);

            //setCurrentUser(user); //we use Observer


            await createUserDocumentFromAuth(user, {displayName: displayName})

            resetFormFields();


        } catch (error) {
            if(error.code === "auth/email-already-in-use"){
                alert("User is already existed, cannot create user");
            }

            console.log(error.message);
        }

        

       
    }

    return(
        <div className="sign-up-container">
            <h2>Do not have an account? </h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display name" onChange={handleChange} name="displayName" value={displayName} type="text"/>
                <FormInput label="Email" onChange={handleChange} name="email" value={email} type="email"/>
                <FormInput label="Password" onChange={handleChange} name="password" value={password} type="password"/>
                <FormInput label="Confirm Password" onChange={handleChange} name="confirmPassword" value={confirmPassword} type="password"/>
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;