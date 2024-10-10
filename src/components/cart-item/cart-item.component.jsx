import "./cart-item.styles.scss"

const CartItem = ({ cartItem }) => {
    
    const { name, quantity, imageUrl, price } = cartItem;
    console.log(name);
    console.log(quantity);
    console.log(imageUrl);
    console.log(price);


    return (
        <div className="cart-item-container">
            <img src={imageUrl} alt={`${name}`}/> 
            <div className="item-details">
                <span className="name">{name}</span>
                <span className="price">{quantity} x ${price}</span>

            </div>
        </div>
    );
};
export default CartItem;