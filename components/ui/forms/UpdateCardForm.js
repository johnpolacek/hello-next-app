import React, { useState } from "react"
import Router from "next/router"
import appConfig from "../../../app.config"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import theme from "../../theme"
import getToken from "../../../lib/firebase/getToken"
import { stringToSlug } from "../../../lib/util"
import { Box, Heading } from "theme-ui"
import Form from "./Form"

const UpdateCardForm = ({ user, stripeId }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [cardError, setCardError] = useState(null)
  const [cardSuccess, setCardSuccess] = useState(null)
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
      setCardError(err.message)
    }
  }

  const handleStripePaymentMethod = async (result) => {
    if (result.error) {
      setCardError(result.error.message)
    } else {
      getToken().then((res) => {
        fetch("/api/updateCard", {
          method: "POST",
          mode: "same-origin",
          body: JSON.stringify({
            token: res.token,
            stripeId,
            paymentMethodId: result.paymentMethod.id,
          }),
        }).then((response) => {
          if (response.status == 200) {
            Router.push("/account")
          } else {
            setCardError(
              "Sorry we could not update your card at this time. Please contact support at " +
                appConfig.support
            )
          }
        })
      })
    }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      buttonText={"Update Card"}
      error={cardError}
      id="UpdateCardForm"
      minWidth="400px"
    >
      <Heading sx={{ pb: 5 }} as="h2" variant="cardheading">
        Update Card on File
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
    </Form>
  )
}

export default UpdateCardForm
