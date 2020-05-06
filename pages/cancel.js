import React from "react"
import withSession from "../lib/session"
import appConfig from "../app.config"
import Wrapper from "../components/layout/Wrapper"
import Cancel from "../components/views/Cancel"
import getPlan from "../lib/firebase/getPlan"

const CancelPage = (props) => {
  return (
    <Wrapper
      url="/"
      title={appConfig.name + " | Cancel"}
      description={"Your " + appConfig.name + " account information"}
      bg="primary"
      user={props.user}
    >
      <Cancel {...props} />
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

export default CancelPage
