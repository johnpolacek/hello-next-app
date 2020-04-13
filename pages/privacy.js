import appConfig from "../app.config"
import Wrapper from "../components/layout/Wrapper"
import { MDXProvider } from "@mdx-js/react"
import Privacy from "../components/markdown/privacy.mdx"
import Container from "../components/ui/containers/Container"

export default () => (
  <Wrapper
    url="/privacy"
    title={appConfig.name + " | Privacy Policy"}
    description={"Privacy policy information for " + appConfig.name + " users"}
  >
    <MDXProvider>
      <Container id="privacy">
        <Privacy />
      </Container>
    </MDXProvider>
  </Wrapper>
)
