import appConfig from "../app.config"
import Wrapper from "../components/layout/Wrapper"
import Demo from "../components/views/Demo"

export default () => (
  <Wrapper
    url="/tour"
    title={appConfig.name + " | Tour"}
    description={"Product tour of " + appConfig.name}
    bg="primary"
  >
    <Demo />
  </Wrapper>
)
