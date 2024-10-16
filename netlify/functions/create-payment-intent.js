require("dotenv").config();

//const stripe = require("stripe")("sk_test_51Q8ezvLi0bXcLfVvtQG2gv5jfjVZqjWslVWPt6B5fFCgWIYbDSJXanIBfgQ1fza4h4KErDHLbmbD8zPv9klZa5iD00s07yKCx2");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async(event) => {
    try {
        const { amount } = JSON.parse(event.body);
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"]
        });

        return{
            statusCode: 200,
            body: JSON.stringify({ paymentIntent})
        }

    } catch (error) {
        console.log({error});

        return{
            statusCode: 400,
            body: JSON.stringify({error})
        }
        
    }
}