import withAuthUser from "../utils/context/withAuthUser"
import withAuthUserInfo from "../utils/context/withAuthUserInfo"
import Wrapper from "../components/layout/Wrapper"
import appConfig from "../app.config"
import AboutView from "../components/views/About"

const About = (props) => (
  <Wrapper
    url="/"
    title={appConfig.name + " | About"}
    description={"More information about " + appConfig.name}
    bg="primary"
  >
    <AboutView />
  </Wrapper>
)

export default withAuthUser(withAuthUserInfo(About))
