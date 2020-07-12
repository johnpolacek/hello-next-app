import React, { useState } from "react"
import Router from "next/router"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { parseCookies } from "nookies"
import theme from "../../theme"
import { stringToSlug } from "../../../lib/util"
import { Box } from "theme-ui"
import Form from "./Form"
import PlanSelected from "../plans/PlanSelected"

const CheckoutForm = ({ paymentIntent, plan, user, subscriptionId }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [checkoutError, setCheckoutError] = useState(null)
  const [checkoutSuccess, setCheckoutSuccess] = useState(null)
  const [subscription, setSubscription] = useState(null)

  const handleSubmit = async () => {
    try {
      const result = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          email: user.email,
        },
      })
      await handleStripePaymentMethod(result)
    } catch (err) {
      setCheckoutError(err.message)
    }
  }

  const handleStripePaymentMethod = async (result) => {
    if (result.error) {
      setCheckoutError(result.error.message)
    } else {
      const response = await fetch(
        subscriptionId ? "/api/updateSubscription" : "/api/createCustomer",
        {
          method: "POST",
          mode: "same-origin",
          body: JSON.stringify({
            uid: user.uid,
            paymentMethodId: result.paymentMethod.id,
            planId: plan.planId,
            planPrice: plan.price,
            planName: plan.name,
            email: user.email,
            subscriptionId,
          }),
        }
      )

      const subscription = await response.json()
      handleSubscription(subscription)
    }
  }

  const handleSubscription = (subscription) => {
    const { latest_invoice } = subscription
    const { payment_intent } = latest_invoice
    setSubscription(subscription)

    if (payment_intent) {
      const { client_secret, status } = payment_intent

      if (status === "requires_action") {
        stripe.confirmCardPayment(client_secret).then(function (result) {
          if (result.error) {
            setCheckoutError(result.error.message)
          } else {
            setCheckoutSuccess(true)
          }
        })
      } else {
        setCheckoutSuccess(true)
      }
    } else {
      setCheckoutError(`handleSubscription:: No payment information received!`)
    }
  }

  if (checkoutSuccess) {
    Router.push("/plans/" + stringToSlug(plan.name) + "/ready")
  }

  return (
    <Form
      onSubmit={handleSubmit}
      buttonText={"Pay $" + plan.price}
      error={checkoutError}
      id="CheckoutForm"
      minWidth="400px"
    >
      <PlanSelected plan={plan.name} />
      <Box sx={theme.forms.input}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: theme.colors.black || "black",
                "::placeholder": {
                  color: theme.colors.gray || "gray",
                },
              },
              invalid: {
                color: theme.colors.red || "red",
              },
            },
          }}
        />
      </Box>
    </Form>
  )
}

export default CheckoutForm
