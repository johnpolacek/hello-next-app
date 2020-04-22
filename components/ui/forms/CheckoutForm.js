import React, { useState } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { destroyCookie } from "nookies"
import setPlan from "../../../utils/firebase/setPlan"
import theme from "../../theme"
import { Box, Card, Heading, Text, Button } from "theme-ui"
import Form from "./Form"
import CircleCheckmark from "../graphics/CircleCheckmark"

const CheckoutForm = ({ paymentIntent, plan }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [checkoutError, setCheckoutError] = useState()
  const [checkoutSuccess, setCheckoutSuccess] = useState()

  const handleSubmit = async () => {
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
    try {
      setPlan(plan)
    } catch (err) {
      console.log(err)
      setCheckoutError(err.message)
    }
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
