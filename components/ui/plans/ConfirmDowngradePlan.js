import React, { useState } from "react"
import Router from "next/router"
import appConfig from "../../../app.config"
import { stringToSlug } from "../../../lib/util"
import { Box, Card, Text, Button } from "theme-ui"
import PlanSelected from "./PlanSelected"
import ButtonLink from "../nav/ButtonLink"
import getToken from "../../../lib/firebase/getToken"
import cancelPlan from "../../../lib/firebase/cancelPlan"

const ConfirmDowngradePlan = (props) => {
  const [error, setError] = useState(null)

  const freePlan = appConfig.plans.filter((plan) => {
    return plan.price === 0
  })[0]

  const onClickDowngrade = () => {
    getToken().then((res) => {
      if (res.success) {
        cancelPlan(props.planId, props.subscriptionId, props.user.uid).then(
          (response) => {
            if (response.error) {
              setError(response.error)
            } else {
              const freePlan = appConfig.plans.filter((plan) => {
                return plan.price === 0
              })[0]
              Router.push("/plans/" + stringToSlug(freePlan.name) + "/ready")
            }
          }
        )
      } else {
        setError(res.error)
      }
    })
  }

  return (
    <Card
      sx={{
        bg: "white",
        width: "96%",
        maxWidth: "450px",
        mx: "auto",
        textAlign: "center",
      }}
    >
      <PlanSelected plan={freePlan.name} />
      <Text sx={{ pb: 5, mt: -2 }}>
        After making this change, you will no longer have the benefits of your
        paid plan. Are you sure you want to downgrade to {freePlan.name}?
      </Text>
      {error && (
        <Text sx={{ color: "red", py: 3 }}>
          Sorry there was an error downgrading your account. Please contact
          support at {appConfig.support}
        </Text>
      )}
      <Box sx={{ display: "inline-block", mx: 3 }}>
        <Button
          onClick={onClickDowngrade}
          sx={{ fontSize: 3, bg: "red", color: "white" }}
        >
          Yes, downgrade
        </Button>
      </Box>
      <Box sx={{ display: "inline-block", mx: 3, mt: 3 }}>
        <ButtonLink fontSize={3} bg="white" href="/account" color="primary">
          Nevermind, go back
        </ButtonLink>
      </Box>
    </Card>
  )
}

export default ConfirmDowngradePlan