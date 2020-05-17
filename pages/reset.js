import React from "react"
import withSession from "../../lib/session"
import ResetPassword from "../components/views/ResetPassword"
import appConfig from "../app.config"
import Layout from "../components/layout/Layout"

const Reset = (props) => {
  const isSignedIn = props.user != null

  return (
    <Layout
      url="/"
      title={appConfig.name + " | " + appConfig.shortDescription}
      description={appConfig.longDescription}
    >
      <ResetPassword isSignedIn={isSignedIn} />
    </Layout>
  )
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user")

  if (user === undefined) {
    res.setHeader("location", "/login")
    res.statusCode = 302
    res.end()
    return
  } else {
    const user = req.session.get("user")
    return { props: { user } }
  }
})

export default Reset
