import React from "react"
import withSession from "../../../../lib/session"
import Layout from "../../../../components/layout/Layout"
import appConfig from "../../../../app.config"
import { findBySlug } from "../../../../lib/util"
import getPlan from "../../../../lib/firebase/admin/getPlan"
import ConfirmDowngradePlan from "../../../../components/ui/plans/ConfirmDowngradePlan"

const ChangeToFreePlanPage = (props) => {
  const subscriptionId =
    props.currPlan && props.currPlan.subscription
      ? props.currPlan.subscription
      : 0
  return (
    <Layout
      url="/"
      title={appConfig.name + " | Downgrade Plan"}
      description={
        "Downgrade to the " +
        appConfig.name +
        " " +
        props.newPlan.name +
        " Plan"
      }
      user={props.user}
    >
      <ConfirmDowngradePlan
        planId={props.currPlan.id}
        subscriptionId={subscriptionId}
        user={props.user}
      />
    </Layout>
  )
}

export const getServerSideProps = withSession(async (ctx) => {
  const req = ctx.req
  const res = ctx.res
  const user = req.session.get("user")

  if (user === undefined) {
    res.setHeader("location", "/login")
    res.statusCode = 302
    res.end()
    return
  } else {
    return await getPlan(user.uid).then((currPlan) => {
      let newPlan = findBySlug(appConfig.plans, "name", ctx.params.plan)
      return {
        props: {
          currPlan,
          user,
          newPlan,
        },
      }
    })
  }
})

export default ChangeToFreePlanPage
