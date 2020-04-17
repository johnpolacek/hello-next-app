// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment with the PaymentRequestButton using the official Stripe docs.
// https://stripe.com/docs/stripe-js/elements/payment-request-button#react

import React, { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import {
  PaymentRequestButtonElement,
  Elements,
  useStripe,
} from "@stripe/react-stripe-js"
import { Box, Card, Button, Heading, Text } from "theme-ui"
import appConfig from "../../../app.config"

const Result = ({ children }) => <div className="result">{children}</div>

const ErrorResult = ({ children }) => <div className="error">{children}</div>

const NotAvailableResult = () => (
  <Result>
    <p style={{ textAlign: "center" }}>
      PaymentRequest is not available in your browser.
    </p>
    {window.location.protocol !== "https:" && (
      <p style={{ textAlign: "center" }}>
        Try using{" "}
        <a href="https://ngrok.com" target="_blank" rel="noopener noreferrer">
          ngrok
        </a>{" "}
        to view this demo over https.
      </p>
    )}
  </Result>
)

const ELEMENT_OPTIONS = {
  style: {
    paymentRequestButton: {
      type: "buy",
      theme: "dark",
    },
  },
}

const CheckoutForm = (props) => {
  const stripe = useStripe()
  const [paymentRequest, setPaymentRequest] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notAvailable, setNotAvailable] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const plan = appConfig.plans[props.plan]

  useEffect(() => {
    if (!stripe) {
      // We can't create a PaymentRequest until Stripe.js loads.
      return
    }

    const pr = stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        label: appConfig.name + " " + plan.name,
        amount: plan.price,
      },
    })

    pr.on("paymentmethod", async (event) => {
      setPaymentMethod(event.paymentMethod)
      event.complete("success")
    })

    pr.canMakePayment().then((canMakePaymentRes) => {
      if (canMakePaymentRes) {
        setPaymentRequest(pr)
      } else {
        setNotAvailable(true)
      }
    })
  }, [stripe])

  return (
    <Card as="form" sx={{ maxWidth: "400px", mx: "auto" }}>
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

      {paymentRequest && (
        <PaymentRequestButtonElement
          onClick={(event) => {
            if (paymentMethod) {
              event.preventDefault()
              setErrorMessage(
                "You can only use the PaymentRequest button once. Refresh the page to start over."
              )
            }
          }}
          options={{
            ...ELEMENT_OPTIONS,
            paymentRequest,
          }}
        />
      )}
      {notAvailable && <NotAvailableResult />}
      {errorMessage && <ErrorResult>{errorMessage}</ErrorResult>}
      {paymentMethod && <Result>Got PaymentMethod: {paymentMethod.id}</Result>}
    </Card>
  )
}

// Call `loadStripe` outside of a component’s render to avoid recreating the Stripe object on every render
const stripePromise = loadStripe("pk_test_Lgr71n8BQ91Fl6TPQKE4jPDv00BO4ts8Kr")

export default (props) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm {...props} />
  </Elements>
)
