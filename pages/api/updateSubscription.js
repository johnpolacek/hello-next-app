import getPlan from "../../lib/firebase/admin/getPlan"
import setPlan from "../../lib/firebase/admin/setPlan"
import updateUserProperties from "../../lib/firebase/admin/updateUserProperties"
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST)

export default async (req, res) => {
  const debug = true

  if (req.method === "POST") {
    const { uid, subscriptionId, planId, planName, planPrice } = JSON.parse(
      req.body
    )

    debug && console.log("updateSubscription req.body", JSON.parse(req.body))

    debug && console.log("updateSubscription id " + subscriptionId)

    try {
      let currPlanData = await getPlan(uid)
      debug &&
        console.log(
          `updateSubscription getPlan: ${JSON.stringify({ currPlanData })}`
        )

      const currSubscription = await stripe.subscriptions.retrieve(
        subscriptionId
      )

      debug &&
        console.log(
          `updateSubscription retrieve currSubscription: ${JSON.stringify({
            currSubscription,
          })}`
        )

      const itemIdToDelete = currSubscription.items.data[0].id

      const subscription = await stripe.subscriptions.update(subscriptionId, {
        items: [{ plan: planId }, { id: itemIdToDelete, deleted: true }],
        expand: ["latest_invoice.payment_intent"],
      })

      debug &&
        console.log(`updateSubscription: Successfully updated subscription`)

      const newPlanData = {
        price: planPrice,
        name: planName,
        id: planId,
        subscription: subscription.id,
        last4: currPlanData.last4,
        network: currPlanData.network,
        expires: currPlanData.expires,
      }

      debug &&
        console.log(
          `updateSubscription new planData:: ${JSON.stringify(newPlanData)}`
        )

      const setPlanResult = await setPlan(currPlanData.id, newPlanData)
      debug &&
        console.log(
          `updateSubscription: Successfully set plan data: ${JSON.stringify(
            newPlanData
          )}`
        )

      res.status(200).json(subscription)
    } catch (e) {
      console.log(`updateSubscription: Error: ${e.message}`)
      res.status(500).json({ statusCode: 500, message: e.message })
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
