import Stripe from "stripe"
import { parseCookies, setCookie } from "nookies"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import CheckoutForm from "./CheckoutForm"

const stripePromise = loadStripe("pk_test_Lgr71n8BQ91Fl6TPQKE4jPDv00BO4ts8Kr")

export const getServerSideProps = async (ctx) => {
  const stripe = new Stripe("sk_test_W86VDt8I7VWbh1GjZcEzoA9Q00e4NRT9d1")

  let paymentIntent

  const { paymentIntentId } = await parseCookies(ctx)

  console.log("paymentIntentId", paymentIntentId)

  if (paymentIntentId) {
    paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    console.log("paymentIntent", paymentIntent)

    return {
      props: {
        paymentIntent,
      },
    }
  }

  paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: "usd",
  })

  setCookie(ctx, "paymentIntentId", paymentIntent.id)

  return {
    props: {
      paymentIntent,
    },
  }
}

const CheckoutPage = ({ paymentIntent, plan }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm planId={plan} paymentIntent={paymentIntent} />
  </Elements>
)

export default CheckoutPage
