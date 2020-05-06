import React, { useState } from "react"
import { Flex, Box, Heading, Text, Link } from "theme-ui"
import DataRow from "../ui/data/DataRow"
import ButtonLink from "../ui/nav/ButtonLink"
import appConfig from "../../app.config"
import { stringToSlug, findBySlug } from "../../lib/util"
import updateEmail from "../../lib/firebase/updateEmail"
import updatePassword from "../../lib/firebase/updatePassword"

export default (props) => {
  const [error, setError] = useState("")
  const plan = findBySlug(
    appConfig.plans,
    "name",
    stringToSlug(props.plan.type)
  )

  return (
    <Box sx={{ textAlign: "center", width: "100%", color: "white", pb: 5 }}>
      <Heading variant="headline">Your Account</Heading>
      <Text sx={{ pb: 4, fontStyle: "italic" }}>{error}&nbsp;</Text>
      {props.plan ? (
        <>
          <DataRow
            name="email"
            value={props.user.email}
            label="Email"
            onSave={(newEmail, onComplete) => {
              updateEmail(newEmail).then((response) => {
                if (!response.success) {
                  setError(response.message)
                }
                onComplete()
              })
            }}
          />
          <DataRow
            name="password"
            value="••••••••••••"
            label="Password"
            type="password"
            onSave={(newPassword, onComplete) => {
              updatePassword(newPassword).then((response) => {
                if (!response.success) {
                  setError(response.message)
                }
                window.location.reload()
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
        </>
      ) : (
        <Box sx={{ pb: 6, mb: 6 }}>
          <Heading variant="subhead">Your account is inactive.</Heading>
          <ButtonLink bg="secondary" fontSize={4} href="/plans">
            Activate New Plan
          </ButtonLink>
        </Box>
      )}
    </Box>
  )
}
