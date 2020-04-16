import withAuthUser from "../utils/context/withAuthUser"
import withAuthUserInfo from "../utils/context/withAuthUserInfo"
import appConfig from "../app.config"
import Wrapper from "../components/layout/Wrapper"
import DemoView from "../components/views/Demo"

const Demo = (props) => (
  <Wrapper
    url="/tour"
    title={appConfig.name + " | Tour"}
    description={"Product tour of " + appConfig.name}
    bg="primary"
  >
    <DemoView />
  </Wrapper>
)

export default withAuthUser(withAuthUserInfo(Demo))
