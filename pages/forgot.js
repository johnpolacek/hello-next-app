import React from "react"
import Layout from "../components/layout/Layout"
import ForgotPassword from "../components/views/ForgotPassword"
import appConfig from "../app.config"

const ForgotPage = () => {
  return (
    <Layout
      url="/"
      title={appConfig.name + " | Login"}
      description={
        "If you have forgotten your password for " +
        appConfig.name +
        " then this is the place to be"
      }
    >
      <ForgotPassword />
    </Layout>
  )
}

export default ForgotPage