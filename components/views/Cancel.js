import React, { useState } from "react"
import { Box, Heading, Text, Button } from "theme-ui"
import Link from "next/link"
import ButtonLink from "../ui/nav/ButtonLink"
import getToken from "../../lib/firebase/getToken"
import cancelPlan from "../../lib/firebase/cancelPlan"
import appConfig from "../../app.config"

const Cancel = (props) => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const onCancel = async () => {
    getToken().then((res) => {
      if (res.success) {
        cancelPlan(props.plan.id, props.plan.subscription, props.user.uid).then(
          (response) => {
            if (response.error) {
              setError(response.error)
            } else {
              setSuccess(true)
            }
          }
        )
      } else {
        setError(res.error)
      }
    })
  }

  return (
    <Box id="CancelAccount" sx={{ textAlign: "center", width: "100%", color: "white", pb: 5 }}>
      <Heading variant="headline">Cancel Account</Heading>
      {!error && !success && (
        <>
          <Heading variant="subhead">
            Are you sure you want to cancel your account?
          </Heading>
          <ButtonLink bg="white" href="./account">
            No, Go Back
          </ButtonLink>
          <Button
            onClick={onCancel}
            sx={{ ml: 4, fontSize: 3, color: "white" }}
            variant="secondary"
          >
            Yes, Cancel Account
          </Button>
        </>
      )}
      {error && (
        <Heading variant="subhead">
          Sorry there was an error cancelling your account. Please contact
          support at {appConfig.support}
        </Heading>
      )}
      {success && (
        <Heading id="CancelSuccess" variant="subhead">Your account has been cancelled.</Heading>
      )}
    </Box>
  )
}

export default Cancel
