import Layout from "../../../components/layout/Layout"
import appConfig from "../../../app.config"
import ChoosePlan from "../../../components/ui/plans/ChoosePlan"
import { findBySlug } from "../../../lib/util"
import Stripe from "stripe"
import { parseCookies, setCookie } from "nookies"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "../../../components/ui/forms/CheckoutForm"
import PlanSignupSuccess from "../../../components/ui/plans/PlanSignupSuccess"

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY_TEST)

export const getServerSideProps = async (ctx) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST)
  let plan = findBySlug(appConfig.plans, "name", ctx.params.plan)

  let paymentIntent
  const { paymentIntentId } = await parseCookies(ctx)

  // free plans do not have an id and the user does not have a subscription
  if (plan.price > 0) {
    plan.id =
      process.env.NODE_ENV === "development" ? plan.planIdTest : plan.planId
  }

  if (paymentIntentId) {
    paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    return {
      props: {
        paymentIntent,
        plan,
      },
    }
  }

  paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: "usd",
  })

  setCookie(ctx, "paymentIntentId", paymentIntent.id, {})

  return {
    props: {
      paymentIntent,
      plan,
    },
  }
}

const PlanCheckoutPage = (props) => {
  const { accountEmail, uid } = parseCookies()
  const user = { uid, email: accountEmail }

  return (
    <Layout
      url="/"
      title={appConfig.name + " | " + props.plan.name + " Plan"}
      description={
        "Purchase the " + appConfig.name + " " + props.plan.name + " Plan"
      }
    >
      <Elements stripe={stripePromise}>
        <CheckoutForm
          user={user}
          plan={props.plan}
          paymentIntent={props.paymentIntent}
        />
      </Elements>
    </Layout>
  )
}

export default PlanCheckoutPage
