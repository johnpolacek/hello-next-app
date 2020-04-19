import React, { useState } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import Router from "next/router"
import { destroyCookie } from "nookies"
import { Box, Card, Heading, Text, Button } from "theme-ui"
import CircleCheckmark from "../graphics/CircleCheckmark"
import appConfig from "../../../app.config"
import theme from "../../theme"

const CheckoutForm = ({ paymentIntent, plan }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [checkoutError, setCheckoutError] = useState()
  const [checkoutSuccess, setCheckoutSuccess] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const {
        error,
        paymentIntent: { status },
      } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })

      if (error) throw new Error(error.message)

      if (status === "succeeded") {
        destroyCookie(null, "paymentIntentId")
        setCheckoutSuccess(true)
      }
    } catch (err) {
      setCheckoutError(err.message)
    }
  }

  if (checkoutSuccess) {
    Router.push("/plans/paid")
  }

  return (
    <Card
      as="form"
      onSubmit={handleSubmit}
      sx={{
        minWidth: "360px",
        mx: "auto",
        textAlign: "center",
      }}
    >
      <CircleCheckmark color="secondary" />
      <Heading as="h3" variant="cardheading">
        <Text sx={{ fontSize: 3, mb: -2 }}>You’ve selected </Text>
        <Text sx={{ fontSize: 8, fontWeight: 700 }}>{plan.name}</Text>
      </Heading>

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

      <Box sx={{ pt: 4 }}>
        <Button variant="huge" type="submit" disabled={!stripe}>
          Pay ${plan.price}
        </Button>
      </Box>

      {checkoutError && <Text variant="error">{checkoutError}</Text>}
    </Card>
  )
}

export default CheckoutForm
