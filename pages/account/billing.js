import withSession from "../../lib/session"
import getPlan from "../../lib/firebase/admin/getPlan"
import Layout from "../../components/layout/Layout"
import appConfig from "../../app.config"
import ChoosePlan from "../../components/ui/plans/ChoosePlan"
import { findBySlug } from "../../lib/util"
import Stripe from "stripe"
import { parseCookies, setCookie } from "nookies"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import UpdateCardForm from "../../components/ui/forms/UpdateCardForm"

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY_TEST)

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get("user")

  if (user === undefined) {
    res.setHeader("location", "/login")
    res.statusCode = 302
    res.end()
    return
  } else {
    const user = req.session.get("user")
    return await getPlan(user.uid).then((plan) => {
      return { props: { user, plan } }
    })
  }
})

const AccountBillingPage = (props) => {
  const { accountEmail, uid } = parseCookies()
  const user = { uid, email: accountEmail }

  return (
    <Layout
      url="/"
      title={appConfig.name + " | Update Card"}
      description={"Update Credit Card on File"}
      user={props.user}
    >
      <Elements stripe={stripePromise}>
        <UpdateCardForm stripeId={props.plan.stripeId} user={user} />
      </Elements>
    </Layout>
  )
}

export default AccountBillingPage
