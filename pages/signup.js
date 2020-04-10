import React from "react"
import Wrapper from "../components/layout/Wrapper"
import SignUpForm from "../components/ui/forms/SignUpForm"
import appConfig from "../app.config"

export default () => {
  return (
    <Wrapper
      url="/"
      title={appConfig.name + " | Sign Up"}
      description="Hello Web App Demo of creating a new account"
      bg="primary"
    >
      <SignUpForm />
    </Wrapper>
  )
}
