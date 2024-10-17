import "./cart-dropdown.styles.scss"
import Button, {BUTTON_TYPES_CLASSES} from "../button/button.component.tsx"
import CartItem from "../cart-item/cart-item.component";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import { useNavigate } from "react-router-dom"

const CartDropdown = () => {
    const { cartItems, isCartOpen, setIsCartOpen } = useContext(CartContext);

    const navigate = useNavigate();

    const goToCheckouthandler = () => {
        setIsCartOpen(!isCartOpen);
        navigate("/checkout");
    }

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {
                    cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)
                }
            </div>
            <Button buttonType={BUTTON_TYPES_CLASSES.inverted} onClick={goToCheckouthandler}>Go to checkout</Button>
        </div>
    );
};
export default CartDropdown;