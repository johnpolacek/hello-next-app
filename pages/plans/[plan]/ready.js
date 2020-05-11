import React from "react"
import withSession from "../../../lib/session"
import Wrapper from "../../../components/layout/Wrapper"
import appConfig from "../../../app.config"
import PlanSignupSuccess from "../../../components/ui/plans/PlanSignupSuccess"
import { findBySlug } from "../../../lib/util"
import getPlan from "../../../lib/firebase/getPlan"

const PlanReadyPage = (props) => {
  return (
    <Wrapper
      url="/"
      title={appConfig.name + " | " + props.plan.name + " Plan"}
      description={
        "Your " + appConfig.name + " " + props.plan.name + " plan is ready."
      }
      user={props.user}
    >
      <PlanSignupSuccess plan={props.plan} />
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
    console.log(user.uid)
    return await getPlan(user.uid).then((plan) => {
      return { props: { user, plan } }
    })
  }
})

export default PlanReadyPage
