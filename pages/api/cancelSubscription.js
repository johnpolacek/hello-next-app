import Stripe from "stripe"
import updateUserProperties from "../../lib/firebase/admin/updateUserProperties"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST)

export default async (req, res) => {
  if (req.method === "POST") {
    const { planId, subscriptionId, uid } = JSON.parse(req.body)
    const isValid = planId.split("-")[0] === uid

    if (isValid) {
      try {
        stripe.subscriptions.del(subscriptionId, (err, confirmation) => {
          console.error("err", err)

          const userData = { plan: 0 }
          const setUserResult = updateUserProperties(uid, userData).then(() => {
            res.status(200).json({ err, confirmation })
          })
        })
      } catch (e) {
        res.status(500).json({ statusCode: 500, message: e.message })
      }
    } else {
      res.status(400).json({ statusCode: 400, message: "Request not valid" })
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
