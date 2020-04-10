import React from "react"
import Wrapper from "../components/layout/Wrapper"
import SignInForm from "../components/ui/forms/SignInForm"

export default () => {
  return (
    <Wrapper
      url="/"
      title="Login to Your Account"
      description="The account login page for Hello Next App"
    >
      <SignInForm />
    </Wrapper>
  )
}
