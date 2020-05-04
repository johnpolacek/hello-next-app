import React from "react"
import withSession from "../lib/session"
import getPlan from "../lib/firebase/getPlan"
import appConfig from "../app.config"
import Wrapper from "../components/layout/Wrapper"
import Account from "../components/views/Account"

const AccountPage = (props) => {
  return (
    <Wrapper
      url="/"
      title={appConfig.name + " | Account"}
      description={"Your " + appConfig.name + " account information"}
      bg="primary"
    >
      {props.user && <Account {...props} />}
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
    return await getPlan(user.uid).then((plan) => {
      return { props: { user, plan } }
    })
  }
})

export default AccountPage
