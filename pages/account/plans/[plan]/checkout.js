import React from "react"
import withSession from "../../../../lib/session"
import Layout from "../../../../components/layout/Layout"
import appConfig from "../../../../app.config"
import ChoosePlan from "../../../../components/ui/plans/ChoosePlan"
import { findBySlug } from "../../../../lib/util"
import getPlan from "../../../../lib/firebase/admin/getPlan"
import Stripe from "stripe"
import { parseCookies, setCookie } from "nookies"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "../../../../components/ui/forms/CheckoutForm"

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY_TEST)

const UserPlanPage = (props) => (
  <Layout
    url="/"
    title={appConfig.name + " | " + props.newPlan.name + " Plan"}
    description={
      "Purchase the " + appConfig.name + " " + props.newPlan.name + " Plan"
    }
    user={props.user}
  >
    <Elements stripe={stripePromise}>
      {props.currPlan && props.currPlan.subscription && (
        <CheckoutForm
          user={props.user}
          plan={props.newPlan}
          subscriptionId={props.currPlan.subscription}
          paymentIntent={props.paymentIntent}
        />
      )}
    </Elements>
  </Layout>
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
    let newPlan = findBySlug(appConfig.plans, "name", ctx.params.plan)
    let paymentIntent
    const { paymentIntentId } = await parseCookies(ctx)

    newPlan.id =
      process.env.NODE_ENV === "development"
        ? newPlan.planIdTest
        : newPlan.planId

    paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: "usd",
    })

    setCookie(ctx, "paymentIntentId", paymentIntent.id)

    return await getPlan(user.uid).then((currPlan) => {
      return {
        props: {
          paymentIntent,
          currPlan,
          user,
          newPlan,
        },
      }
    })
  }
})

export default UserPlanPage
