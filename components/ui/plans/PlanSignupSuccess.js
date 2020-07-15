import { Box, Heading } from "theme-ui"
import ButtonLink from "../nav/ButtonLink"
import appConfig from "../../../app.config"
import PricingPlan from "./PricingPlan"

const PlanSignupSuccess = (props) => (
  <Box
    sx={{
      textAlign: "center",
      width: "100%",
      color: "white",
      pt: 4,
      pb: 5,
    }}
  >
    <Heading variant="headline">All Set!</Heading>
    <Heading variant="subhead">
      Thanks for {props.plan.price === 0 ? "choosing" : "purchasing"} the{" "}
      {props.plan.name} Plan. Your account is ready to go.
    </Heading>
    <Box sx={{ pb: 5 }}>
      <Box sx={{ display: "inline-block", mx: 3 }}>
        <ButtonLink fontSize={4} bg="red" href="/">
          Go to {appConfig.name}
        </ButtonLink>
      </Box>
      <Box sx={{ display: "inline-block", mx: 3 }}>
        <ButtonLink fontSize={4} bg="white" href="/account">
          View Account Page
        </ButtonLink>
      </Box>
    </Box>
  </Box>
)

export default PlanSignupSuccess
