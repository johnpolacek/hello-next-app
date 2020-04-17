import React, { useState } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { destroyCookie } from "nookies"
import { Box, Card, Heading, Text, Button } from "theme-ui"
import appConfig from "../../../app.config"
import theme from "../../theme"

const CheckoutForm = ({ paymentIntent, planId }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [checkoutError, setCheckoutError] = useState()
  const [checkoutSuccess, setCheckoutSuccess] = useState()
  const plan = appConfig.plans[planId]

  console.log("CheckoutForm paymentIntent", paymentIntent)
  console.log("CheckoutForm planId", planId)

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

  if (checkoutSuccess) return <p>Payment successfull!</p>

  return (
    <Card
      as="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: "400px", mx: "auto", textAlign: "center" }}
    >
      <Box
        sx={{
          color: "secondary",
          pr: 1,
          fontWeight: 900,
          fontSize: 4,
          display: "inline-block",
          transform: "rotate(-6deg)",
          borderRadius: "50%",
          borderColor: "secondary",
          border: "4px solid",
          width: "42px",
          height: "42px",
          mt: -3,
          mb: 2,
        }}
      >
        ✓
      </Box>
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
                border: "1px solid #ddd",
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

      {checkoutError && <span style={{ color: "red" }}>{checkoutError}</span>}
    </Card>
  )
}

export default CheckoutForm
