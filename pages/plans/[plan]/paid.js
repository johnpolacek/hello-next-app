import React from "react"
import withSession from "../../lib/session"
import Wrapper from "../../../components/layout/Wrapper"
import appConfig from "../../../app.config"
import PlanSignupSuccess from "../../../components/ui/plans/PlanSignupSuccess"
import { findBySlug } from "../../../lib/util"

const PaidPage = (props) => {
  const selectedPlan = props.url.asPath.split("/")[2]
  const plan = findBySlug(appConfig.plans, "name", selectedPlan)

  return (
    <Wrapper
      url="/"
      title={appConfig.name + " | " + plan.name + " Plan Purchased"}
      description={"Choose the right " + appConfig.name + " plan for you"}
    >
      <PlanSignupSuccess plan={plan} />
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

export default PaidPage
