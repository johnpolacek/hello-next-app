import React from "react"
import withSession from "../lib/session"
import IndexView from "../components/views/Index"
import appConfig from "../app.config"

import Layout from "../components/layout/Layout"
// Note: It is recommended for SEO that you have a different title and description for each page

const Index = (props) => {
  const isSignedIn = props.user != null

  return (
    <Layout
      url="/"
      title={appConfig.name + " | " + appConfig.shortDescription}
      description={appConfig.longDescription}
      user={props.user}
    >
      <IndexView isSignedIn={isSignedIn} />
    </Layout>
  )
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user")

  if (user === undefined) {
    return { props: { user: null } }
  } else {
    const user = req.session.get("user")
    return { props: { user } }
  }
})

export default Index
