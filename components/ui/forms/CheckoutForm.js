import React, { useState } from "react"
import Router from "next/router"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { parseCookies } from "nookies"
import theme from "../../theme"
import { stringToSlug } from "../../../lib/util"
import { Box, Card, Heading, Text, Button } from "theme-ui"
import Form from "./Form"
import CircleCheckmark from "../graphics/CircleCheckmark"

const CheckoutForm = ({ paymentIntent, plan }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [checkoutError, setCheckoutError] = useState(null)
  const [checkoutSuccess, setCheckoutSuccess] = useState(null)
  const [subscription, setSubscription] = useState(null)
  const { accountEmail, uid } = parseCookies()

  const handleSubmit = async () => {
    try {
      const result = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          email: accountEmail,
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
      const response = await fetch("/api/createCustomer", {
        method: "POST",
        mode: "same-origin",
        body: JSON.stringify({
          uid,
          paymentMethodId: result.paymentMethod.id,
          planId: plan.planId,
          planPrice: plan.price,
          planName: plan.name,
          email: accountEmail,
        }),
      })

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
      id="LoginForm"
      minWidth="400px"
    >
      <Box sx={{ textAlign: "center" }}>
        <CircleCheckmark color="secondary" />
        <Heading as="h3" variant="cardheading">
          <Text sx={{ fontSize: 3, mb: -2 }}>You’ve selected </Text>
          <Text sx={{ fontSize: 8, fontWeight: 700 }}>{plan.name}</Text>
        </Heading>
      </Box>

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
