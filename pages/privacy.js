import withAuthUser from "../utils/context/withAuthUser"
import withAuthUserInfo from "../utils/context/withAuthUserInfo"
import appConfig from "../app.config"
import Wrapper from "../components/layout/Wrapper"
import { MDXProvider } from "@mdx-js/react"
import PrivacyContent from "../components/markdown/privacy.mdx"
import Container from "../components/ui/containers/Container"

const Privacy = (props) => (
  <Wrapper
    url="/privacy"
    title={appConfig.name + " | Privacy Policy"}
    description={"Privacy policy information for " + appConfig.name + " users"}
  >
    <MDXProvider>
      <Container id="privacy">
        <PrivacyContent />
      </Container>
    </MDXProvider>
  </Wrapper>
)

export default withAuthUser(withAuthUserInfo(Privacy))
