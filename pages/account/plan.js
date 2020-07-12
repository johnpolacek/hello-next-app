import React from "react"
import withSession from "../../lib/session"
import appConfig from "../../app.config"
import getPlan from "../../lib/firebase/admin/getPlan"
import Layout from "../../components/layout/Layout"
import ManagePlan from "../../components/views/ManagePlan"

const ManagePlanPage = (props) => {
  return (
    <Layout
      url="/"
      title={appConfig.name + " | Manage Plan"}
      description={"Update your " + appConfig.name + " plan"}
      user={props.user}
    >
      {props.user && props.plan && <ManagePlan {...props} />}
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

export default ManagePlanPage
