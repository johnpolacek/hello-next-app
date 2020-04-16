import withAuthUser from "../utils/context/withAuthUser"
import withAuthUserInfo from "../utils/context/withAuthUserInfo"
import appConfig from "../app.config"
import Wrapper from "../components/layout/Wrapper"
import { MDXProvider } from "@mdx-js/react"
import TermsContent from "../components/markdown/terms.mdx"
import Container from "../components/ui/containers/Container"

const Terms = (props) => (
  <Wrapper
    url="/terms"
    title={appConfig.name + " | Terms of Service"}
    description={"Terms of service for the usage of " + appConfig.name}
  >
    <MDXProvider>
      <Container id="terms">
        <TermsContent />
      </Container>
    </MDXProvider>
  </Wrapper>
)

export default withAuthUser(withAuthUserInfo(Terms))
