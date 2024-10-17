import { FC, ButtonHTMLAttributes } from "react";
import "./button.styles.scss"
/*
    3 types of button types

    default

    inverted

    google button

*/

export enum BUTTON_TYPES_CLASSES {
    base = 'base',
    google = 'google-sign-in',
    inverted = 'inverted',
}

export type ButtonProps = {
    buttonType?: BUTTON_TYPES_CLASSES;
    isLoading?: boolean;

}& ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, buttonType, isLoading, ...otherProps }) => {
    
    return(
        <button disabled={isLoading} className={`button-container ${buttonType} ${isLoading&& "spinner-container"}`} {...otherProps}>{children}</button>
    )
}

export default Button