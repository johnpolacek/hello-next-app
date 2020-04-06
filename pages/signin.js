import React from "react"
import Wrapper from "../components/layout/Wrapper"
import SignInForm from "../components/ui/forms/SignInForm"

export default () => {
  return (
    <Wrapper
      url="/"
      title="Hello Web App | Sign In"
      description="Hello Web App Demo of Signing in to your account"
    >
      <SignInForm />
    </Wrapper>
  )
}
