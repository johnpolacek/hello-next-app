import { Flex, Box, Heading, Text, Link } from "theme-ui"
import NextLink from "next/link"
import ButtonLink from "../ui/nav/ButtonLink"
import appConfig from "../../app.config"
import { stringToSlug, findBySlug } from "../../lib/util"
import Pricing from "../ui/plans/Pricing"

export default (props) => {
  console.log("Plan props.plan.name", props.plan.name)

  const plan = findBySlug(
    appConfig.plans,
    "name",
    stringToSlug(props.plan.name)
  )

  return (
    <Box sx={{ textAlign: "center", width: "100%", color: "white", pb: 5 }}>
      <Heading variant="headline">Manage Plan</Heading>
      <Heading variant="subhead">
        Your current plan is <br />
        <Box as="span" sx={{ fontWeight: 700, fontSize: 5 }}>
          {props.plan.name}
        </Box>
      </Heading>
      <Pricing current={props.plan.name} />
      {props.plan ? (
        <>
          <Box sx={{ pt: 4, fontSize: 1 }}>
            <NextLink href="../cancel" passHref>
              <Link variant="reverse">Cancel Account</Link>
            </NextLink>
          </Box>
        </>
      ) : (
        <Box sx={{ pb: 6, mb: 6 }}>
          <Heading variant="subhead">Your account has been cancelled.</Heading>
          <ButtonLink bg="secondary" fontSize={4} href="/plans">
            Activate New Plan
          </ButtonLink>
        </Box>
      )}
    </Box>
  )
}
