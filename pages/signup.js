import React from "react"
import Wrapper from "../components/layout/Wrapper"
import SignUpForm from "../components/ui/forms/SignUpForm"
import appConfig from "../app.config"

export default () => {
  return (
    <Wrapper
      url="/"
      title={appConfig.name + " | Sign Up"}
      description={"Sign up for a new " + appConfig.name + " account"}
    >
      <SignUpForm />
    </Wrapper>
  )
}
