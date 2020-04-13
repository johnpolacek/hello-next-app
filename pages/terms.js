import appConfig from "../app.config"
import Wrapper from "../components/layout/Wrapper"
import { MDXProvider } from "@mdx-js/react"
import Terms from "../components/markdown/terms.mdx"
import Container from "../components/ui/containers/Container"

export default () => (
  <Wrapper
    url="/terms"
    title={appConfig.name + " | Terms of Service"}
    description={"Terms of service for the usage of " + appConfig.name}
  >
    <MDXProvider>
      <Container id="terms">
        <Terms />
      </Container>
    </MDXProvider>
  </Wrapper>
)
