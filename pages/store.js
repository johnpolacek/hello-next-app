import React from "react"
import withSession from "../lib/session"
import Layout from "../components/layout/Layout"
import appConfig from "../app.config"
import StoreView from "../components/views/Store"

const Store = (props) => (
  <Layout
    url="/"
    title={appConfig.name + " | Store"}
    description={"Items available for purchase from " + appConfig.name}
    user={props.user}
  >
    <StoreView />
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

export default Store
