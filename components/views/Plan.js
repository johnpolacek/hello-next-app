import React, { useState } from "react"
import { Flex, Box, Heading, Text, Link } from "theme-ui"
import NextLink from "next/link"
import DataRow from "../ui/data/DataRow"
import ButtonLink from "../ui/nav/ButtonLink"
import appConfig from "../../app.config"
import { stringToSlug, findBySlug } from "../../utils/functions"
import updateEmail from "../../utils/firebase/updateEmail"

export default (props) => {
  const [error, setError] = useState("")
  const plan = findBySlug(
    appConfig.plans,
    "name",
    stringToSlug(props.plan.type)
  )

  return (
    <Box sx={{ textAlign: "center", width: "100%", color: "white", pb: 5 }}>
      <Heading variant="headline">Manage Plan</Heading>
      <Text sx={{ pb: 4, fontStyle: "italic" }}>{error}&nbsp;</Text>
      {props.plan ? (
        <>
          <DataRow
            name="email"
            value={props.AuthUserInfo.AuthUser.email}
            label="Email"
            onSave={(email, onComplete) => {
              updateEmail(email).then((response) => {
                if (!response.success) {
                  setError(response.message)
                }
                onComplete()
              })
            }}
          />
          <DataRow link="/account/plan" label="Plan">
            {props.plan.type}{" "}
            {plan.isMonthly && (
              <Text as="span" sx={{ fontSize: 0, pl: 1 }}>
                {" "}
                (${props.plan.price}/month)
              </Text>
            )}
          </DataRow>
          <DataRow link="/account/billing" label="Billing">
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
