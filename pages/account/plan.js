import React from "react"
import withSession from "../../lib/session"
import appConfig from "../../app.config"
import Layout from "../../components/layout/Layout"
import Plan from "../../components/views/Plan"
import getPlan from "../../lib/firebase/getPlan"

const PlanPage = (props) => {
  return (
    <Layout
      url="/"
      title={appConfig.name + " | Manage Plan"}
      description={"Update your " + appConfig.name + " plan"}
    >
      {props.user && <Plan {...props} />}
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
    return await getPlan(user.uid).then((plan) => {
      return { props: { user, plan } }
    })
  }
})

export default PlanPage
