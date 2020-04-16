import { Box, Heading } from "theme-ui"
import Pricing from "../../ui/pricing/Pricing"

export default (props) => (
  <Box
    sx={{ textAlign: "center", width: "100%", color: "white", pt: 3, pb: 5 }}
  >
    <Heading variant="headline">Choose the plan that’s right for you</Heading>
    <Heading variant="subhead">
      30-Day Free Trial is included with all plans
    </Heading>
    <Pricing />
  </Box>
)
