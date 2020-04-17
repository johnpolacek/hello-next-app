import { Flex } from "theme-ui"
import appConfig from "../../../app.config"
import PricingPlan from "./PricingPlan"

export default (props) => (
  <Flex sx={{ flexWrap: "wrap", width: "100%", justifyContent: "center" }}>
    {appConfig.plans.map((plan, index) => (
      <PricingPlan key={"plan" + index} index={index} {...plan} />
    ))}
  </Flex>
)
