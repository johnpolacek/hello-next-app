import withSession from "../../lib/session"
import getPlan from "../../lib/firebase/admin/getPlan"
import setPlan from "../../lib/firebase/admin/setPlan"
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST)

const updateCard = withSession(async (req, res) => {
  const { token, paymentMethodId, stripeId } = JSON.parse(req.body)
  let user = req.session.get("user")

  try {
    if (stripeId === -1) {
      return res.status(401).json({ result: "Missing Stripe customer id" })
    } else {
      const attachPayment = await stripe.paymentMethods.attach(
        paymentMethodId,
        {
          customer: stripeId,
        }
      )

      const customer = await stripe.customers.update(stripeId, {
        invoice_settings: {
          custom_fields: null,
          default_payment_method: paymentMethodId,
          footer: null,
        },
      })

      let plan = await getPlan(user.uid)
      plan.last4 = attachPayment.card.last4
      plan.expires =
        attachPayment.card.exp_month.toString().padStart(2, "0") +
        "/" +
        attachPayment.card.exp_year.toString().substr(2)

      setPlan(plan.id, user.uid, plan)

      return res.status(200).json({ customer })
    }
  } catch (error) {
    return res.status(401).json({ result: "error" }, error)
  }
})

export default updateCard
