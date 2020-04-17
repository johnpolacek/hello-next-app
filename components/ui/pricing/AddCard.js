import React from "react"
import ReactDOM from "react-dom"
import { loadStripe } from "@stripe/stripe-js"
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { Box, Card, Button, Heading, Text } from "theme-ui"
import appConfig from "../../../app.config"

const CheckoutForm = (props) => {
  const stripe = useStripe()
  const elements = useElements()
  const plan = appConfig.plans[props.plan]

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    })
  }

  return (
    <Card
      as="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: "400px", mx: "auto" }}
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

      <CardElement />
      <Button variant="large" sx={{ mt: 4 }} type="submit" disabled={!stripe}>
        Pay ${plan.price}
      </Button>
    </Card>
  )
}

const stripePromise = loadStripe("pk_test_Lgr71n8BQ91Fl6TPQKE4jPDv00BO4ts8Kr")

export default (props) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm {...props} />
  </Elements>
)
