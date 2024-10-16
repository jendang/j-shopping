import { loadStripe } from "@stripe/stripe-js";



//export const stripePromise = loadStripe("pk_test_51Q8ezvLi0bXcLfVvLMIx40lM2qjW1kaWyxyjrE99EkT79b0WIAq8BTYncYmZITVjVwVVmk295iCBQei6JKzrWgjO00jlIy1SNY")
export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)