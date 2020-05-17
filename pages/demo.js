import React from "react"
import withSession from "../lib/session"
import appConfig from "../app.config"
import Layout from "../components/layout/Layout"
import DemoView from "../components/views/Demo"

const Demo = (props) => (
  <Layout
    url="/tour"
    title={appConfig.name + " | Tour"}
    description={"Product tour of " + appConfig.name}
    bg="primary"
    user={props.user}
  >
    <DemoView />
  </Layout>
)

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user")

  if (user === undefined) {
    return { props: { user: null } }
  } else {
    const user = req.session.get("user")
    return { props: { user } }
  }
})

export default Demo
