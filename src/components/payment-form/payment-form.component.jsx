import "./payment-form.styles.scss"

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"

import Button, {BUTTON_TYPES_CLASSES} from "../button/button.component.tsx"
import { useContext, useState } from "react";
import { CartContext } from "../../context/cart.context";
import { UserContext } from "../../context/user.context";

const PaymentForm = (props) => {
    //stripe hooks
    const stripe = useStripe();
    const elements = useElements();

    const { total } = useContext(CartContext);
    console.log(total)
    const { currentUser } = useContext(UserContext);
    console.log(currentUser);

    const [ isProcessingPayment, setIsProcessingPayment ] = useState(false);

    if(total < 0) return;


    const paymentHandler = async(e) => {
        e.preventDefault();
        if(!stripe || !elements) return;

        setIsProcessingPayment(true);

        //fetch request to stripe to create payment intent
        const response = await fetch("/.netlify/functions/create-payment-intent", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount: total * 100 })
        }).then(res => {
            
            return res.json();
        })
        //console.log(response)
        const { paymentIntent: {client_secret}} = response;
        //console.log(client_secret);


        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    // name: currentUser ? currentUser.displayName : (currentUser.email ? currentUser.email : "guest")
                    name: currentUser ? currentUser.email : "guest"
                }
            }
        });

        console.log(paymentResult);

        if(paymentResult.error){
            alert(paymentResult.error);
        }else{
            if(paymentResult.paymentIntent.status === 'succeeded'){
                alert("payment successful")
            }
        }
    }

    return (
        <div className="payment-form-container">
            <div className="form-container">
                <h2>Credit card payment: </h2>
                <CardElement />
            </div>
            <Button isLoading={isProcessingPayment} type="submit" buttonType={BUTTON_TYPES_CLASSES.inverted} onClick={paymentHandler}>Pay now</Button>
        </div>
    );
};
export default PaymentForm;