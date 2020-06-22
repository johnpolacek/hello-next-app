import setPlan from "../../lib/firebase/admin/setPlan"
import updateUserProperties from "../../lib/firebase/admin/updateUserProperties"
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST)

export default async (req, res) => {
  if (req.method === "POST") {
    const {
      uid,
      paymentMethodId,
      planId,
      planName,
      planPrice,
      email,
    } = JSON.parse(req.body)

    try {
      const customer = await stripe.customers.create({
        payment_method: paymentMethodId,
        email: email,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      })
      console.log(
        `createCustomer: Successfully created customer: ${JSON.stringify(
          customer
        )}`
      )
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ plan: planId }],
        expand: ["latest_invoice.payment_intent"],
      })

      console.log(
        `createCustomer: Successfully created subscription: ${JSON.stringify(
          subscription
        )}`
      )

      const userPlanId = uid + "-" + new Date().getTime()
      const userData = {
        stripeId: customer.id,
        plan: userPlanId,
      }

      const setUserResult = await updateUserProperties(uid, userData)

      console.log(
        `createCustomer: Successfully set user data: ${JSON.stringify(
          userData
        )}`
      )

      const planData = {
        price: planPrice,
        name: planName,
        id: planId,
        subscription: subscription.items.data[0].subscription,
        last4:
          subscription.latest_invoice.payment_intent.charges.data[0]
            .payment_method_details.card.last4,
        network:
          subscription.latest_invoice.payment_intent.charges.data[0]
            .payment_method_details.card.network,
        expires:
          subscription.latest_invoice.payment_intent.charges.data[0].payment_method_details.card.exp_month
            .toString()
            .padStart(2, "0") +
          "/" +
          subscription.latest_invoice.payment_intent.charges.data[0].payment_method_details.card.exp_year
            .toString()
            .substr(2),
      }

      const setPlanResult = await setPlan(userPlanId, planData)
      console.log(
        `createCustomer: Successfully set plan data: ${JSON.stringify(
          userData
        )}`
      )

      res.status(200).json(subscription)
    } catch (e) {
      console.log(`createCustomer: Error: ${e.message}`)
      res.status(500).json({ statusCode: 500, message: e.message })
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
