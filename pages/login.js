import React from "react"
import Layout from "../components/layout/Layout"
import LoginForm from "../components/ui/forms/LoginForm"
import appConfig from "../app.config"

export default () => {
  return (
    <Layout
      url="/"
      title={appConfig.name + " | Login"}
      description="The account login page for Hello Next App"
    >
      <LoginForm />
    </Layout>
  )
}
