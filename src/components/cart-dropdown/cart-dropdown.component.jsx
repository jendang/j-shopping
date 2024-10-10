import "./cart-dropdown.styles.scss"
import Button from "../button/button.component"

const CartDropdown = (props) => {
    
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items"></div>
            <Button buttonType="">Go to checkout</Button>
        </div>
    );
};
export default CartDropdown;