import withAuthUser from "../utils/context/withAuthUser"
import withAuthUserInfo from "../utils/context/withAuthUserInfo"
import { MDXProvider } from "@mdx-js/react"
import appConfig from "../app.config"
import Wrapper from "../components/layout/Wrapper"
import Container from "../components/ui/containers/Container"
import DocsContent from "../README.md"

const Docs = (props) => (
  <Wrapper
    url="/docs"
    title={appConfig.name + " | Docs"}
    description={"Technical documentation for " + appConfig.name}
  >
    <MDXProvider>
      <Container id="docs">
        <DocsContent />
      </Container>
    </MDXProvider>
  </Wrapper>
)

export default withAuthUser(withAuthUserInfo(Docs))
