import "./button.styles.scss"
/*
    3 types of button types

    default

    inverted

    google button

*/

const BUTTON_TYPES_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
}

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
    return(
        <button disabled={isLoading} className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]} ${isLoading&& "spinner-container"}`} {...otherProps}>{children}</button>
    )
}

export default Button