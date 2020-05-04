import React from "react"
import withSession from "../lib/session"
import IndexView from "../components/views/Index"
import appConfig from "../app.config"

import Wrapper from "../components/layout/Wrapper"
// Note: It is recommended for SEO that you have a different title and description for each page

const Index = (props) => {
  const isSignedIn = props.user != null

  return (
    <Wrapper
      url="/"
      title={appConfig.name + " | " + appConfig.shortDescription}
      description={appConfig.longDescription}
      bg={isSignedIn ? "white" : "primary"}
    >
      <IndexView isSignedIn={isSignedIn} />
    </Wrapper>
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
    return { props: { user }}
  }
})

export default Index
