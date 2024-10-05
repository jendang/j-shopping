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

const Button = ({ children, buttonType, ...otherProps }) => {
    return(
        <button className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`} {...otherProps}>{children}</button>
    )
}

export default Button