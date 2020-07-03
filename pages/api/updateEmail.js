import withSession from "../../lib/session"
import updateAuthUserProperty from "../../lib/firebase/admin/updateAuthUserProperty"
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST)

const updateEmail = withSession(async (req, res) => {
  const { token, email, stripeId } = req.body
  let user = req.session.get("user")

  try {
    const data = await updateAuthUserProperty(token, "email", email)
    user.email = email
    req.session.set("user", user)
    await req.session.save()
    if (stripeId === -1) {
      return res.status(200).json({ data })
    } else {
      stripe.customers.update(stripeId, { email }, async (err, customer) => {
        console.log("stripe.customers.update err", err)
        console.log("stripe.customers.update customer", customer)
        return res.status(200).json({ data })
      })
    }
  } catch (error) {
    console.log("error", error)
    return res.status(401).json({ result: "error" }, error)
  }
})

export default updateEmail
