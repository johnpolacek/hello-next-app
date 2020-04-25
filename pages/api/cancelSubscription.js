import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST)

export default async (req, res) => {
  if (req.method === "POST") {
    const { planId, subscriptionId, userId } = JSON.parse(req.body)
    const isValid = planId.split("-")[0] === userId

    if (isValid) {
      try {
        stripe.subscriptions.del(subscriptionId, (err, confirmation) => {
          console.log("err", err)
          console.log("confirmation", confirmation)
          res.status(200).json({ err, confirmation })
        })
      } catch (e) {
        console.log(`create-customer:: Error: ${e.message}`)
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