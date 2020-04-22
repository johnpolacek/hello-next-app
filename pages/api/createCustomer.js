import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST)

export default async (req, res) => {
  if (req.method === "POST") {
    const { paymentMethodId } = JSON.parse(req.body)

    //const { paymentMethodId, planId } = JSON.parse(req.body)
    console.log("update createCustomer to get planId param")
    const planId = "plan_H98v1kie0YIbxG"

    try {
      const customer = await stripe.customers.create({
        payment_method: paymentMethodId,
        phone: "555-555-5555",
        email: "janedoe@example.com",
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      })
      console.log(
        `create-customer:: Successfully created customer: ${JSON.stringify(
          customer
        )}`
      )
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ plan: planId }],
        expand: ["latest_invoice.payment_intent"],
      })

      console.log(
        `create-customer:: Successfully created subscription: ${JSON.stringify(
          subscription
        )}`
      )
      res.status(200).json(subscription)
    } catch (e) {
      console.log(`create-customer:: Error: ${e.message}`)
      res.status(500).json({ statusCode: 500, message: e.message })
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
