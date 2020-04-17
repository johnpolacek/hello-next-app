import React, { useState } from "react"
import { Box, Heading } from "theme-ui"
import Pricing from "./Pricing"
import Checkout from "./Checkout"

export default (props) => {
  const [plan, setPlan] = useState(null)

  return (
    <Box
      sx={{ textAlign: "center", width: "100%", color: "white", pt: 3, pb: 5 }}
    >
      <Heading variant="headline">Choose the plan that’s right for you</Heading>
      <Heading variant="subhead">
        30-Day Free Trial is included with all plans
      </Heading>
      {plan !== null ? (
        <Checkout />
      ) : (
        <Pricing
          onSelect={(selectedPlan) => {
            setPlan(selectedPlan)
          }}
        />
      )}
    </Box>
  )
}
