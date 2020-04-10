import React from "react"
import Wrapper from "../components/layout/Wrapper"
import LoginForm from "../components/ui/forms/LoginForm"

export default () => {
  return (
    <Wrapper
      url="/"
      title="Login to Your Account"
      description="The account login page for Hello Next App"
      bg="primary"
    >
      <LoginForm />
    </Wrapper>
  )
}
