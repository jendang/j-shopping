import  SignInForm  from "../sign-in/sign-in-form.component.tsx";
import SignUpForm from "../sign-up/sign-up-form.component.jsx"
import "./authentication.styles.scss"

const Authentication = () => {
    return(
        <div className="authentication-container">
            <SignInForm/>

            <SignUpForm />
        </div>

    )
}

export default Authentication