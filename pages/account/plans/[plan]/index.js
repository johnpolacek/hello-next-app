import React from "react"
import withSession from "../../../../lib/session"
import Wrapper from "../../../../components/layout/Wrapper"
import appConfig from "../../../../app.config"
import ChoosePlan from "../../../../components/ui/plans/ChoosePlan"
import { findBySlug } from "../../../../utils/functions"
import Stripe from "stripe"
import { parseCookies, setCookie } from "nookies"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "../../../../components/ui/forms/CheckoutForm"

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY_TEST)

const UserPlanPage = (props) => (
  <Wrapper
    url="/"
    title={appConfig.name + " | " + props.plan.name + " Plan"}
    description={
      "Purchase the " + appConfig.name + " " + props.plan.name + " Plan"
    }
    bg="primary"
  >
    <Elements stripe={stripePromise}>
      <CheckoutForm plan={props.plan} paymentIntent={props.paymentIntent} />
    </Elements>
  </Wrapper>
)

export const getServerSideProps = withSession(async (ctx) => {
  const req = ctx.req
  const res = ctx.res
  const user = req.session.get("user")

  if (user === undefined) {
    res.setHeader("location", "/login")
    res.statusCode = 302
    res.end()
    return
  } else {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST)
    let plan = findBySlug(appConfig.plans, "name", ctx.params.plan)
    let paymentIntent
    const { paymentIntentId } = await parseCookies(ctx)

    plan.id =
      process.env.NODE_ENV === "development" ? plan.planIdTest : plan.planId

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

    setCookie(ctx, "paymentIntentId", paymentIntent.id)

    return {
      props: {
        paymentIntent,
        plan,
      },
    }
  }
})

export default UserPlanPage
