import React, { useState } from "react"
import { Box, Heading, Button } from "theme-ui"
import Router from "next/router"
import appConfig from "../../app.config"
import ForgotPasswordForm from "../ui/forms/ForgotPasswordForm"

export default (props) => {
  const [isSent, setIsSent] = useState(false)

  return (
    <>
      {isSent ? (
        <Box sx={{ color: "white", textAlign: "center", width: "100%", pb: 6 }}>
          <Heading as="h2" sx={{ pb: 4, fontWeight: "lite" }}>
            Please check your email, the link to reset your password has been
            sent.
          </Heading>
        </Box>
      ) : (
        <Box sx={{ textAlign: "center", width: "100%", pt: 5, pb: 6 }}>
          <Heading sx={{ pb: 3, color: "white" }} as="h1">
            Forgot Your Password?
          </Heading>
          <Heading sx={{ fontWeight: "lite", color: "white", pb: 5 }} as="h2">
            No problem! Provide your email and we’ll send you an email to get
            signed back in. back in.
          </Heading>
          <ForgotPasswordForm onComplete={() => setIsSent(true)} />
        </Box>
      )}
    </>
  )
}
