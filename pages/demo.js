import React from "react"
import withSession from "../lib/session"
import appConfig from "../app.config"
import Wrapper from "../components/layout/Wrapper"
import DemoView from "../components/views/Demo"

const Demo = (props) => (
  <Wrapper
    url="/tour"
    title={appConfig.name + " | Tour"}
    description={"Product tour of " + appConfig.name}
    bg="primary"
  >
    <DemoView />
  </Wrapper>
)

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

export default Demo
