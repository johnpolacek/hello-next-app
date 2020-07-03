import React, { useState } from "react"
import { Flex, Box, Heading, Text, Link } from "theme-ui"
import DataRow from "../ui/data/DataRow"
import ButtonLink from "../ui/nav/ButtonLink"
import appConfig from "../../app.config"
import { stringToSlug, findBySlug } from "../../lib/util"
import getToken from "../../lib/firebase/getToken"

export default (props) => {
  const [error, setError] = useState("")
  const plan = props.plan
    ? findBySlug(appConfig.plans, "name", stringToSlug(props.plan.name))
    : appConfig.plans[0]

  console.log("props.plan", props.plan)

  return (
    <Box
      id="accountInfo"
      sx={{ textAlign: "center", width: "100%", color: "white", pb: 5 }}
    >
      <Heading variant="headline">Your Account</Heading>
      <Text sx={{ pb: 4, fontStyle: "italic" }}>{error}&nbsp;</Text>
      {plan ? (
        <>
          <DataRow
            name="email"
            value={props.user.email}
            label="Email"
            type="email"
            onSave={(newEmail, onComplete) => {
              getToken().then((res) => {
                if (res.success) {
                  fetch("/api/updateEmail", {
                    method: "POST",
                    // eslint-disable-next-line no-undef
                    headers: new Headers({
                      "Content-Type": "application/json",
                    }),
                    credentials: "same-origin",
                    body: JSON.stringify({
                      token: res.token,
                      email: newEmail,
                      stripeId:
                        typeof props.plan.stripeId === "undefined"
                          ? -1
                          : props.plan.stripeId,
                    }),
                  }).then((res) => {
                    res.json().then((data) => {
                      window.location.reload()
                    })
                  })
                } else {
                  setError(res.error)
                }
              })
            }}
          />
          <DataRow
            name="password"
            value="••••••••••••"
            label="Password"
            type="password"
            onSave={(newPassword, onComplete) => {
              getToken().then((res) => {
                if (res.success) {
                  fetch("/api/updatePassword", {
                    method: "POST",
                    // eslint-disable-next-line no-undef
                    headers: new Headers({
                      "Content-Type": "application/json",
                    }),
                    credentials: "same-origin",
                    body: JSON.stringify({
                      token: res.token,
                      password: newPassword,
                    }),
                  }).then((res) => {
                    res.json().then((data) => {
                      console.log("success data", data)
                    })
                  })
                } else {
                  setError(res.error)
                }
              })
            }}
          />
          <DataRow link="/account/plan" label="Plan">
            {plan.price > 0 ? (
              <Box>
                <Text as="span">{plan.name} </Text>
              </Box>
            ) : (
              <Box>
                <Text as="span">{plan.name} </Text>
                <Text as="span" sx={{ fontSize: 1 }}>
                  (free plan)
                </Text>
              </Box>
            )}
          </DataRow>
          {plan.price > 0 && plan.isMonthly && (
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
          )}
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
