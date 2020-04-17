import withAuthUser from "../../../utils/context/withAuthUser"
import withAuthUserInfo from "../../../utils/context/withAuthUserInfo"
import Wrapper from "../../../components/layout/Wrapper"
import appConfig from "../../../app.config"
import ChoosePlan from "../../../components/ui/plans/ChoosePlan"

// const PlanPage = (props) => {
//   return (
//     <Wrapper
//       url="/"
//       title={appConfig.name + " | Plans"}
//       description={"Choose the right " + appConfig.name + " plan for you"}
//       bg="primary"
//     >
//       <div>Plan: {props.plan}</div>
//     </Wrapper>
//   )
// }

// export default withAuthUser(withAuthUserInfo(PlanPage))

import Stripe from "stripe"
import { parseCookies, setCookie } from "nookies"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import CheckoutForm from "../../../components/ui/plans/CheckoutForm"

const stripePromise = loadStripe("pk_test_Lgr71n8BQ91Fl6TPQKE4jPDv00BO4ts8Kr")

export const getServerSideProps = async (ctx) => {
  const stripe = new Stripe("sk_test_W86VDt8I7VWbh1GjZcEzoA9Q00e4NRT9d1")

  let paymentIntent

  const { paymentIntentId } = await parseCookies(ctx)

  if (paymentIntentId) {
    paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    return {
      props: {
        paymentIntent,
        plan: ctx.params.plan,
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
      plan: ctx.params.plan,
    },
  }
}

const PlanPage = (props) => (
  <Wrapper
    url="/"
    title={appConfig.name + " | Plans"}
    description={"Choose the right " + appConfig.name + " plan for you"}
    bg="primary"
  >
    <Elements stripe={stripePromise}>
      <CheckoutForm planId={0} paymentIntent={props.paymentIntent} />
    </Elements>
  </Wrapper>
)

export default PlanPage
