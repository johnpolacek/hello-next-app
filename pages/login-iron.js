import React from "react"
import Wrapper from "../components/layout/Wrapper"
import LoginFormIron from "../components/ui/forms/LoginFormIron"
import appConfig from "../app.config"

export default () => {
  return (
    <Wrapper
      url="/"
      title={appConfig.name + " | Login"}
      description="The account login page for Hello Next App"
      bg="primary"
    >
      <LoginFormIron />
    </Wrapper>
  )
}
