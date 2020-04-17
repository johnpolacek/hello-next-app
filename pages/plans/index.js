import withAuthUser from "../../utils/context/withAuthUser"
import withAuthUserInfo from "../../utils/context/withAuthUserInfo"
import Wrapper from "../../components/layout/Wrapper"
import appConfig from "../../app.config"
import ChoosePlan from "../../components/ui/plans/ChoosePlan"

const Plans = (props) => (
  <Wrapper
    url="/"
    title={appConfig.name + " | Plans"}
    description={"Choose the right " + appConfig.name + " plan for you"}
    bg="primary"
  >
    <ChoosePlan />
  </Wrapper>
)

export default withAuthUser(withAuthUserInfo(Plans))
