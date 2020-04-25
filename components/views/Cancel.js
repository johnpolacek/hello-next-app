import React, { useState } from "react"
import { Box, Heading, Text, Button } from "theme-ui"
import Link from "next/link"
import ButtonLink from "../ui/nav/ButtonLink"
import cancelPlan from "../../utils/firebase/cancelPlan"
import appConfig from "../../app.config"

export default (props) => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const onCancel = async () => {
    const response = await cancelPlan(
      props.plan.id,
      props.plan.subscription,
      props.AuthUserInfo.AuthUser.id
    )
    if (response.error) {
      setError(response.error)
    } else {
      setSuccess(true)
    }
  }

  return (
    <Box sx={{ textAlign: "center", width: "100%", color: "white", pb: 5 }}>
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
            sx={{ ml: 4, fontSize: 3 }}
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
        <Heading variant="subhead">
          Your account status has been set to cancelled.
        </Heading>
      )}
      <Box
        as="pre"
        sx={{
          my: 4,
          bg: "black",
          textAlign: "left",
          opacity: 0.75,
          width: "100%",
          overflow: "scroll",
        }}
      >
        <code>{JSON.stringify(props, null, 2)}</code>
      </Box>
    </Box>
  )
}
