import { Flex, Box, Heading, Text, Link } from "theme-ui"
import NextLink from "next/link"
import DataRow from "../ui/data/DataRow"
import ButtonLink from "../ui/nav/ButtonLink"
import appConfig from "../../app.config"
import { stringToSlug, findBySlug } from "../../utils/functions"

export default (props) => {
  const plan = findBySlug(
    appConfig.plans,
    "name",
    stringToSlug(props.plan.type)
  )

  console.log("Account props", props)

  return (
    <Box sx={{ textAlign: "center", width: "100%", color: "white", pb: 5 }}>
      <Heading variant="headline">Your Account</Heading>
      {props.plan ? (
        <>
          <DataRow label="Email">{props.AuthUserInfo.AuthUser.email}</DataRow>
          <DataRow label="Plan">
            {props.plan.type}{" "}
            {plan.isMonthly && (
              <Text as="span" sx={{ fontSize: 0, pl: 1 }}>
                {" "}
                (${props.plan.price}/month)
              </Text>
            )}
          </DataRow>
          <DataRow label="Billing">
            <Text
              as="span"
              sx={{
                fontSize: 0,
                pl: 1,
                bg: "white",
                borderRadius: "2px",
                px: 2,
                py: 1,
                color: "primary",
                textTransform: "uppercase",
              }}
            >
              {props.plan.network}
            </Text>
            <Text as="span" sx={{ pl: 1, fontSize: 1 }}>
              {" "}
              {props.plan.last4}{" "}
            </Text>
            <Text as="span" sx={{ pl: 1, fontSize: 0 }}>
              exp. {props.plan.expires}
            </Text>
          </DataRow>
          <NextLink href="./cancel" passHref>
            <Link variant="reverse">Cancel Account</Link>
          </NextLink>
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
