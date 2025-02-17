import { useContext } from "react";
import "./checkout.styles.scss"
import { CartContext } from "../../context/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import PaymentForm from "../../components/payment-form/payment-form.component";

const Checkout = () => {
    const { cartItems, total } = useContext(CartContext);

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block"><span>Product</span></div>
                <div className="header-block"><span>Description</span></div>
                <div className="header-block"><span>Quantity</span></div>
                <div className="header-block"><span>Price</span></div>
                <div className="header-block"><span>Remove</span></div>
            </div>
            {cartItems.map(item => <CheckoutItem key={item.id} cartItem={item}/>)}
            <span className="total">Total: ${total}</span>
            <PaymentForm />
        </div>
    );
};
export default Checkout;