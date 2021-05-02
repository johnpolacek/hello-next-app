import { Box, Card, Heading, Text, Button } from "theme-ui"
import CircleCheckmark from "../graphics/CircleCheckmark"

const PlanSelected = (props) => (
  <Box sx={{ textAlign: "center" }}>
    <CircleCheckmark color="secondary" />
    <Heading as="h3" variant="cardheading">
      <Text as="p" sx={{ fontSize: 3, mb: -2 }}>You’ve selected </Text>
      <Text as="p" id="planSelectedName" sx={{ fontSize: 8, fontWeight: 700 }}>
        {props.plan}
      </Text>
    </Heading>
  </Box>
)

export default PlanSelected
