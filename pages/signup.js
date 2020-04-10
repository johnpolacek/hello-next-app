import React from "react"
import Wrapper from "../components/layout/Wrapper"
import SignUpForm from "../components/ui/forms/SignUpForm"

export default () => {
  return (
    <Wrapper
      url="/"
      title="Hello Web App | Sign Up"
      description="Hello Web App Demo of creating a new account"
      bg="primary"
    >
      <SignUpForm />
    </Wrapper>
  )
}
