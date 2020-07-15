import React from "react"
import Layout from "../components/layout/Layout"
import SignUpForm from "../components/ui/forms/SignUpForm"
import appConfig from "../app.config"

const SignUpPage = () => {
  return (
    <Layout
      url="/"
      title={appConfig.name + " | Sign Up"}
      description={"Sign up for a new " + appConfig.name + " account"}
    >
      <SignUpForm />
    </Layout>
  )
}

export default SignUpPage
