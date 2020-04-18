import React, { useState } from "react"
import { Box, Heading } from "theme-ui"
import Pricing from "./Pricing"

export default (props) => (
  <Box
    sx={{ textAlign: "center", width: "100%", color: "white", pt: 3, pb: 5 }}
  >
    <Heading variant="headline">Choose the plan that’s right for you</Heading>
    <Heading variant="subhead">
      Plans for individuals, teams and businesses of every stage, shape and
      size.
    </Heading>
    <Pricing />
  </Box>
)
