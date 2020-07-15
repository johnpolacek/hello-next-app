import { Flex } from "theme-ui"
import appConfig from "../../../app.config"
import PricingPlan from "./PricingPlan"

const Pricing = (props) => (
  <Flex sx={{ flexWrap: "wrap", width: "100%", justifyContent: "center" }}>
    {appConfig.plans.map((plan, index) => (
      <PricingPlan
        isCurrent={props.current === plan.name}
        key={"plan" + index}
        index={index}
        {...plan}
      />
    ))}
  </Flex>
)

export default Pricing
