import React, { useEffect } from "react"
import { Box, Heading, Button } from "theme-ui"
import Router from "next/router"
import appConfig from "../../app.config"
import loginWithEmail from "../../utils/auth/loginWithEmail"
import ResetPasswordForm from "../ui/forms/ResetPasswordForm"

export default (props) => {
  const isReady = typeof window !== "undefined"

  useEffect(() => {
    if (isReady && !props.isSignedIn) {
      loginWithEmail().then((result) => {
        console.log("loginWithEmail result", result)
        // window.location.reload() // on reload, user will be logged in, then can change password
      })
    }
  }, [isReady])

  return <>{props.isSignedIn && <ResetPasswordForm />}</>
}
