import React, { useState } from "react"
import { Box, Heading } from "theme-ui"
import Pricing from "./Pricing"
import appConfig from "../../../app.config"

export default (props) => {
  const subhead =
    appConfig.trial && appConfig.trial !== ""
      ? "All plans come with a free " + appConfig.trial + " trial."
      : "Plans for individuals, teams and businesses of every stage, shape and size."

  return (
    <Box
      sx={{ textAlign: "center", width: "100%", color: "white", pt: 3, pb: 5 }}
    >
      <Heading variant="headline">Choose the plan that’s right for you</Heading>
      <Heading variant="subhead">{subhead}</Heading>
      <Pricing />
    </Box>
  )
}
