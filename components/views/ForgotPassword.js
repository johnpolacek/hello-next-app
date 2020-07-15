import React, { useState } from "react"
import { Box, Heading, Button } from "theme-ui"
import Router from "next/router"
import appConfig from "../../app.config"
import ForgotPasswordForm from "../ui/forms/ForgotPasswordForm"

const ForgotPassword = (props) => {
  const [isSent, setIsSent] = useState(false)

  return (
    <Box sx={{ color: "white", textAlign: "center", width: "100%", py: 6 }}>
      {isSent ? (
        <>
          <Heading as="h2" variant="subhead">
            Please check your email, the link to reset your password has been
            sent.
          </Heading>
        </>
      ) : (
        <>
          <Heading as="h1">Forgot Your Password?</Heading>
          <Heading as="h2" variant="subhead" sx={{ pb: 5 }}>
            No problem! Provide your email and we’ll send you an email to get
            signed back in.
          </Heading>
          <ForgotPasswordForm onComplete={() => setIsSent(true)} />
        </>
      )}
    </Box>
  )
}

export default ForgotPassword