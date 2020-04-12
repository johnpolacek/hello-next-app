import React from "react"
import Wrapper from "../components/layout/Wrapper"
import ForgotPassword from "../components/views/ForgotPassword"
import appConfig from "../app.config"

export default () => {
  return (
    <Wrapper
      url="/"
      title={appConfig.name + " | Login"}
      description={
        "If you have forgotten your password for " +
        appConfig.name +
        " then this is the place to be"
      }
      bg="primary"
    >
      <ForgotPassword />
    </Wrapper>
  )
}
