import React from "react"
import withSession from "../lib/session"
import appConfig from "../app.config"
import getPlan from "../lib/firebase/admin/getPlan"
import Layout from "../components/layout/Layout"
import Account from "../components/views/Account"

const AccountPage = (props) => {
  return (
    <Layout
      url="/"
      title={appConfig.name + " | Account"}
      description={"Your " + appConfig.name + " account information"}
      user={props.user}
    >
      <Account {...props} />
    </Layout>
  )
}

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get("user")

  if (user === undefined) {
    res.setHeader("location", "/login")
    res.statusCode = 302
    res.end()
    return
  } else {
    const user = req.session.get("user")
    return await getPlan(user.uid).then((plan) => {
      return { props: { user, plan } }
    })
  }
})

export default AccountPage
