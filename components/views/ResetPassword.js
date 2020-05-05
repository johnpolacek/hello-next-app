import React, { useEffect } from "react"
import { Box, Heading, Button } from "theme-ui"
import Router from "next/router"
import appConfig from "../../app.config"
import loginWithEmail from "../../lib/firebase/loginWithEmail"
import ResetPasswordForm from "../ui/forms/ResetPasswordForm"

export default (props) => {
  const isReady = typeof window !== "undefined"

  useEffect(() => {
    if (isReady && !props.isSignedIn) {
      loginWithEmail()
    }
  }, [isReady])

  return <>{props.isSignedIn && <ResetPasswordForm />}</>
}
