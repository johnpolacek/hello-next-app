import React from "react"
import Wrapper from "../components/layout/Wrapper"
import LoginForm from "../components/ui/forms/LoginForm"
import appConfig from "../app.config"

export default () => {
  return (
    <Wrapper
      url="/"
      title={appConfig.name + " | Login"}
      description="The account login page for Hello Next App"
      user={props.user}
    >
      <LoginForm />
    </Wrapper>
  )
}
