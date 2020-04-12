import appConfig from "../app.config"
import Wrapper from "../components/layout/Wrapper"
import Tour from "../components/views/Tour"

export default () => (
  <Wrapper
    url="/tour"
    title={appConfig.name + " | Tour"}
    description={"Product tour of " + appConfig.name}
    bg="primary"
  >
    <Tour />
  </Wrapper>
)
