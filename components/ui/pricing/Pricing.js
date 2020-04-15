import { Flex, Card } from "theme-ui"
import appConfig from "../../../app.config"

export default (props) => (
  <Flex sx={{ flexWrap: "wrap", width: "100%", justifyContent: "center" }}>
    {appConfig.plans.map((plan) => (
      <Card sx={{ width: "300px", m: 3 }}>{plan.name}</Card>
    ))}
  </Flex>
)
