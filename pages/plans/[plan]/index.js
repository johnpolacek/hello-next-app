import withAuthUser from "../../../utils/context/withAuthUser"
import withAuthUserInfo from "../../../utils/context/withAuthUserInfo"
import Wrapper from "../../../components/layout/Wrapper"
import appConfig from "../../../app.config"
import ChoosePlan from "../../../components/ui/plans/ChoosePlan"
import { findBySlug } from "../../../utils/functions"
import Stripe from "stripe"
import { parseCookies, setCookie } from "nookies"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "../../../components/ui/plans/CheckoutForm"

console.log("process.env", process.env)

const stripePromise = loadStripe("pk_test_Lgr71n8BQ91Fl6TPQKE4jPDv00BO4ts8Kr")

export const getServerSideProps = async (ctx) => {
  const plan = findBySlug(appConfig.plans, "name", ctx.params.plan)
  const stripe = new Stripe("sk_test_W86VDt8I7VWbh1GjZcEzoA9Q00e4NRT9d1")
  let paymentIntent
  const { paymentIntentId } = await parseCookies(ctx)

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

const PlanPage = (props) => {
  console.log("process.env", process.env)
  return (
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
}

export default PlanPage
