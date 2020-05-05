import React from "react"
import withSession from "../../lib/session"
import Wrapper from "../../../components/layout/Wrapper"
import appConfig from "../../../app.config"
import { Box, Heading } from "theme-ui"
import ButtonLink from "../../../components/ui/nav/ButtonLink"
import { findBySlug } from "../../../lib/util"

const PaidPage = (props) => {
  const selectedPlan = props.url.asPath.split("/")[2]
  const plan = findBySlug(appConfig.plans, "name", selectedPlan)

  return (
    <Wrapper
      url="/"
      title={appConfig.name + " | " + plan.name + " Plan Purchased"}
      description={"Choose the right " + appConfig.name + " plan for you"}
      bg="primary"
    >
      <Box
        sx={{
          textAlign: "center",
          width: "100%",
          color: "white",
          pt: 4,
          pb: 5,
        }}
      >
        <Heading variant="headline">All Set!</Heading>
        <Heading variant="subhead">
          Thanks for purchasing the {plan.name} Plan. Your account is ready to
          go.
        </Heading>
        <Box sx={{ pb: 5 }}>
          <Box sx={{ display: "inline-block", mx: 3 }}>
            <ButtonLink fontSize={4} bg="red" href="/">
              Go to {appConfig.name}
            </ButtonLink>
          </Box>
          <Box sx={{ display: "inline-block", mx: 3 }}>
            <ButtonLink fontSize={4} bg="white" href="/account">
              View Account Page
            </ButtonLink>
          </Box>
        </Box>
      </Box>
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
