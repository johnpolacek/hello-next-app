import React from "react"
import withSession from "../../../lib/session"
import Layout from "../../../components/layout/Layout"
import appConfig from "../../../app.config"
import PlanSignupSuccess from "../../../components/ui/plans/PlanSignupSuccess"
import { findBySlug } from "../../../lib/util"
import getPlan from "../../../lib/firebase/admin/getPlan"

const PlanReadyPage = (props) => {
  console.log("props", props)
  return (
    <Layout
      url="/"
      title={appConfig.name + " | " + props.plan.name + " Plan"}
      description={
        "Your " + appConfig.name + " " + props.plan.name + " plan is ready."
      }
      user={props.user}
    >
      <PlanSignupSuccess plan={props.plan} />
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

export default PlanReadyPage
